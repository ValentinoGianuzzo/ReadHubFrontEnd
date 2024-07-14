import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import "./BookList.css";
import coverImg from "../../images/cover_not_found.png";

interface BookData {
    id: string;
    cover_id?: string;
    title: string;
    author: string[];
    edition_count: number;
    first_publish_year: number;
}

const BookList: React.FC = () => {
    const { books, loading, resultTitle } = useGlobalContext();
    const booksWithCovers = books.map((singleBook: BookData) => {
        return {
            ...singleBook,
            id: singleBook.id.replace("/works/", ""),
            cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
        }
    });

    if (loading) return <Loading />;

    return (
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
    );
}

export default BookList;