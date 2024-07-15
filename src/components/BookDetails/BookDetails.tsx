import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.png";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface BookDetailsProps {
    description: string;
    title: string;
    cover_img: string;
    authors: string;
    publisher: string;
    publishedDate: string;
    categories: string;
}

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [book, setBook] = useState<BookDetailsProps | null>(null);
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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookDetails;
