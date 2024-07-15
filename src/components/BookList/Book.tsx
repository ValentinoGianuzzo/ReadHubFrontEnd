import React from 'react';
import { Link } from 'react-router-dom';
import "./BookList.css";

interface BookProps {
    id: string;
    cover_img: string;
    title: string;
    author: string; // Changed to string from string[]
}

const Book: React.FC<BookProps> = ({ id, cover_img, title, author }) => {
    return (
        <div className='book-item flex flex-column flex-sb'>
            <div className='book-item-img'>
                <img src={cover_img} alt="cover" />
            </div>
            <div className='book-item-info text-center'>
                <Link to={`/book/${id}`}>
                    <div className='book-item-info-item title fw-7 fs-18'>
                        <span>{title}</span>
                    </div>
                </Link>

                <div className='book-item-info-item author fs-15'>
                    <span className='text-capitalize fw-7'>Author: </span>
                    <span>{author}</span>
                </div>
            </div>
        </div>
    );
}

export default Book;
