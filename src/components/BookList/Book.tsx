import React from 'react';
import { Link } from 'react-router-dom';
import "./BookList.css";

interface BookProps {
    id: string;
    cover_img: string;
    title: string;
    author: string[];
    edition_count: number;
    first_publish_year: number;
}

const Book: React.FC<BookProps> = ({ id, cover_img, title, author, edition_count, first_publish_year }) => {
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
                    <span>{author.join(", ")}</span>
                </div>

                <div className='book-item-info-item edition-count fs-15'>
                    <span className='text-capitalize fw-7'>Total Editions: </span>
                    <span>{edition_count}</span>
                </div>

                <div className='book-item-info-item publish-year fs-15'>
                    <span className='text-capitalize fw-7'>First Publish Year: </span>
                    <span>{first_publish_year}</span>
                </div>
            </div>
        </div>
    );
}

export default Book;