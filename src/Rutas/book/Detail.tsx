import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import StarRatings from 'react-star-ratings';

interface Book {
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        imageLinks: {
            thumbnail: string;
        };
        averageRating: number;
    };
}

export default function Detail() {
    const {bookId} = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [bookId]);

    const changeRating = (newRating: number) => {
        setRating(newRating);
    };

    return (
        <div>
            {book ? (
                <>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}
                             style={{marginTop: '60px' ,marginRight: '40px',marginLeft: '20px',maxHeight: '300px',maxWidth:'300px',minHeight: '300px',minWidth:'300px'}}/>
                        <div>
                            <h1>{book.volumeInfo.title}</h1>
                            <h2>{book.volumeInfo.authors.join(', ')}</h2>
                            <div className="bookDescription">
                                <p>
                                    {book.volumeInfo.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Rating: {book.volumeInfo.averageRating}</p>
                        <StarRatings
                            rating={rating}
                            starRatedColor="blue"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <div>
                        <h2>Comments</h2>
                        <form>
                            <textarea placeholder="Write a comment..."></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}