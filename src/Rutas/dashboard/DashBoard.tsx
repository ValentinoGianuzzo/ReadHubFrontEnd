import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from "./Card";
import axios from "axios";
import './style.css';
import SearchBar from "./SearchBar";

const generalQuery = 'a'; // A generic query to get a variety of books

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [defaultBooks, setDefaultBooks] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10`);
            const filteredResults = response.data.items.filter((item: any) => item.volumeInfo.imageLinks);
            setSearchResults(filteredResults || []);
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
    };

    const fetchDefaultBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${generalQuery}&maxResults=20&orderBy=relevance`);
            const filteredResults = response.data.items.filter((item: any) => item.volumeInfo.imageLinks);
            setDefaultBooks(filteredResults || []);
        } catch (error) {
            console.error('Error al obtener libros por defecto:', error);
        }
    };

    useEffect(() => {
        fetchDefaultBooks();
    }, []);

    return (
        <>
            <div className='header'>
                <form
                    className='formBox'
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <button type="submit">Search</button>
                </form>
                <nav>
                    <div className='buttonsBox'>
                        <Link to="/Settings">Settings</Link>
                        <Link to="/Mybooks">My Books</Link>
                        <Link to="/Profile">Profile</Link>
                        <Link to="/">Exit</Link>
                    </div>
                </nav>
            </div>
            <div className="searchResult">
                {searchResults.length > 0 ? (
                    <Card book={searchResults} />
                ) : (
                    <Card book={defaultBooks} />
                )}
            </div>
        </>
    );
}

