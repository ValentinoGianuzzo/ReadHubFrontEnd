import React from 'react';

interface Book {
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
}

const Card: React.FC<CardProps> = ({ book }) => {
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
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;