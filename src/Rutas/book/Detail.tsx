import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

interface Book {
    volumeInfo: {
        title: string;
        description: string;
    };
}

export default function Detail() {
    const { bookId } = useParams();
    const [book, setBook] = useState<Book | null>(null);

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

    return (
        <div>
            {book ? (
                <>
                    <h1>{book.volumeInfo.title}</h1>
                    <h2>book.
                    </h2>
                    <p>{book.volumeInfo.description}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}