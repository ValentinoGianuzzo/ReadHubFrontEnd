import React from 'react';
import axios from 'axios';
import './style.css';
import {Link} from "react-router-dom";

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        imageLinks?: {
            smallThumbnail: string;
        };
        previewLink: string;
    };
    saleInfo?: {
        listPrice?: {
            amount: number;
        };
    };
}

interface CardProps {
    book: Book[];
    onAddBook?: (bookId: string) => void;
}

const Card: React.FC<CardProps> = ({ book, onAddBook }) => {

    /*
    const handleAddBook = async (bookId: string) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/user/addBook?bookId=${bookId}`,
                null,
                {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                console.log('Book added successfully!');
                if (onAddBook) {
                    onAddBook(bookId);
                }
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

     */

    return (
        <>
            {book.map((item, index) => (
                <div key={index} className="cardBox">
                    {item.volumeInfo.imageLinks && (
                        <Link to={`/book/${item.id}`}>
                            <img className="cardImageBox" src={item.volumeInfo.imageLinks.smallThumbnail} alt="" />
                        </Link>
                    )}
                    <div className="bottomCardBox">
                        <h3 className="title" style={{flex: 1}}>{item.volumeInfo.title}</h3>
                    </div>
                </div>
            ))}
        </>
    );
};
export default Card;