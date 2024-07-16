import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.png";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface BookDetailsProps {
    description: string;
    title: string;
    cover_img: string;
    authors: string;
    publisher: string;
    publishedDate: string;
    categories: string;
}

interface Review {
    author: string;
    comment: string;
    rating: number;
}

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [book, setBook] = useState<BookDetailsProps | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [customLists, setCustomLists] = useState<string[]>([]); // Placeholder for custom lists
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function getBookDetails() {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
                const data = await response.json();
                console.log(data);

                if (data) {
                    const { volumeInfo } = data;
                    const { title, description, authors, publisher, publishedDate, categories, imageLinks } = volumeInfo;
                    const newBook: BookDetailsProps = {
                        title: title || "No title found",
                        description: description || "No description found",
                        authors: authors?.join(", ") || "No authors found",
                        publisher: publisher || "No publisher found",
                        publishedDate: publishedDate || "No published date found",
                        categories: categories?.join(", ") || "No categories found",
                        cover_img: imageLinks?.thumbnail || coverImg,
                    };
                    setBook(newBook);
                } else {
                    setBook(null);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getBookDetails();
    }, [id]);

    const handleAddToFavorites = async () => {
        if (!book) {
            console.error('No book selected.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/users/${localStorage.getItem('userId')}/favorite-books`, book);
            console.log(`${book.title} added to favorites`, response.data);
            // Aquí podrías actualizar el estado local o realizar alguna otra acción después de agregar a favoritos
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };



    const handleAddToCustomList = (listName: string) => {
        // Implementar la lógica para agregar a una lista personalizada aquí
        console.log(`${book?.title} added to ${listName}`);
    };

    const handleAddReview = (review: Review) => {
        setReviews([...reviews, review]);
    };

    if (loading) return <Loading />;

    return (
        <section className='book-details'>
            <div className='container'>
                <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
                    <FaArrowLeft size={22} />
                    <span className='fs-18 fw-6'>Go Back</span>
                </button>

                <div className='book-details-content grid'>
                    <div className='book-details-img'>
                        <img src={book?.cover_img} alt="cover img" />
                    </div>
                    <div className='book-details-info'>
                        <div className='book-details-item title'>
                            <span className='fw-6 fs-24'>{book?.title}</span>
                        </div>
                        <div className='book-details-item description'>
                            <span>{book?.description}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Authors: </span>
                            <span className='text-italic'>{book?.authors}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Publisher: </span>
                            <span className='text-italic'>{book?.publisher}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Published Date: </span>
                            <span className='text-italic'>{book?.publishedDate}</span>
                        </div>
                        <div className='book-details-item'>
                            <span className='fw-6'>Categories: </span>
                            <span className='text-italic'>{book?.categories}</span>
                        </div>
                        <div className='book-details-actions'>
                            <button onClick={handleAddToFavorites}>Add to Favorites</button>
                            <select onChange={(e) => handleAddToCustomList(e.target.value)}>
                                <option value="">Add to Custom List</option>
                                {customLists.map((list, index) => (
                                    <option key={index} value={list}>{list}</option>
                                ))}
                            </select>
                            <button onClick={() => handleAddReview({
                                author: "Anonymous", // Puedes cambiar esto por el nombre del usuario logueado
                                comment: "Great book!", // Esta es una muestra, puedes abrir un formulario para el comentario real
                                rating: 5 // Una calificación de muestra
                            })}>Add Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookDetails;
