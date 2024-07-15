import React, { useState } from "react";
import Modal from "./Modal";
import "./card.css";
import "./modal.css";

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
    // saleInfo?: {
    //     listPrice?: {
    //         amount: number;
    //     };
    // };
}

interface CardProps {
    book: Book[];
}

const Card: React.FC<CardProps> = ({ book }) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState<Book | undefined>();

    return (
        <>
            {book.map((item, index) => {
                const thumbnail = item.volumeInfo.imageLinks?.smallThumbnail;
                /*const amount = item.saleInfo?.listPrice?.amount;
                 */
                if (thumbnail /* && amount*/ !== undefined) {
                    return (
                        <React.Fragment key={index}>
                            <div className="card" onClick={() => { setShow(true); setItem(item); }}>
                                <img src={thumbnail} alt="" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    {/*<p className="amount">&#8377;{amount}</p>*/}
                                </div>
                            </div>
                            {show && bookItem === item && <Modal show={show} item={bookItem} onClose={() => setShow(false)} />}
                        </React.Fragment>
                    );
                }
                return null;
            })}
        </>
    );
};

export default Card;
