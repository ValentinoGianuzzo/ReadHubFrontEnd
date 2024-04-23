import React from 'react';
import axios from 'axios';

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
    const handleAddBook = async (bookId: string) => {
        try {
            // Make a POST request to the backend endpoint
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
            // If the request succeeds, execute the success handler
            if (response.status === 200) {
                console.log('Book added successfully!');
                // If an onAddBook function is provided, execute it
                if (onAddBook) {
                    onAddBook(bookId);
                }
            }
        } catch (error) {
            // Handle error
            console.error('Error adding book:', error);
        }
    };

    return (
        <>
            {book.map((item, index) => (
                <div key={index} className="card">
                    {item.volumeInfo.imageLinks && (
                        <img src={item.volumeInfo.imageLinks.smallThumbnail} alt="" />
                    )}
                    <div className="bottom">
                        <h3 className="title">{item.volumeInfo.title}</h3>
                        {item.saleInfo?.listPrice && (
                            <p className="amount">&#8377;{item.saleInfo.listPrice.amount}</p>
                        )}
                        <button onClick={() => handleAddBook(item.id)}>Agregar a Mis Libros</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;
