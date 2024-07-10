import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Card from "./Card";
import axios from "axios";
import './style.css'
import SearchBar from "./SearchBar";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
            setSearchResults(response.data.items || []);
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
    };


    return (
        <>
            <div className='header'>
                <form
                    className='formBox'
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
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
                <Card
                    book={searchResults}
                />
            </div>
        </>
    );
}