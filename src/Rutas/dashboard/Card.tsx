import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

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

    return (
        <>
            {book.map((item, index) => (
                item.volumeInfo.imageLinks ? (
                    <div key={index} className="cardBox">
                        <Link to={`/book/${item.id}`}>
                            <img className="cardImageBox" src={item.volumeInfo.imageLinks.smallThumbnail} alt="" />
                        </Link>
                        <div className="bottomCardBox">
                            <h3 className="title" style={{flex: 1}}>{item.volumeInfo.title}</h3>
                        </div>
                    </div>
                ) : null
            ))}
        </>
    );
};

export default Card;
