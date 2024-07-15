import React from 'react';
import {useGlobalContext} from '../../context';
import Loading from "../Loader/Loader";
import "./BookList.css";
import coverImg from "../../images/cover_not_found.png";
import Book from "./Book";
import DefaultLayout from "../Layout/DefaultLayout";
import Header from "../Header/Header";

interface BookData {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        imageLinks?: {
            thumbnail: string;
        };
    };
}

const BookList: React.FC = () => {
    const {books, loading, resultTitle} = useGlobalContext();

    const booksWithCovers = books.map((singleBook: BookData) => {
        return {
            id: singleBook.id,
            title: singleBook.volumeInfo.title,
            author: singleBook.volumeInfo.authors ? singleBook.volumeInfo.authors.join(", ") : "Unknown Author",
            cover_img: singleBook.volumeInfo.imageLinks ? singleBook.volumeInfo.imageLinks.thumbnail : coverImg,
        };
    });

    if (loading) return <Loading/>;

    return (
        <DefaultLayout>
            <Header/>
            <section className='booklist'>
                <div className='container'>
                    <div className='section-title'>
                        <h2>{resultTitle}</h2>
                    </div>
                    <div className='booklist-content grid'>
                        {booksWithCovers.slice(0, 30).map((item, index) => (
                            <Book key={index} {...item} />
                        ))}
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}

export default BookList;
