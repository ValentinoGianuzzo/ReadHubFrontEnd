import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import MyBooks from './MyBooks';
import Settings from './Settings';
import Card from "../Card";
import axios from "axios";

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
        <div className="home">
            <nav>
                <ul>
                    <li><Link to="/Profile">Profile</Link></li>
                    <li><Link to="/Mybooks">My Books</Link></li>
                    <li><Link to="/Settings">Settings</Link></li>
                    <li><Link to="/">Exit</Link></li>
                </ul>
            </nav>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <input
                    type="text"
                    placeholder="Search Book..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="search-results">
                <Card book={searchResults}/>
            </div>
            <Routes>
                <Route path="/Profile" element={<Profile />} />
                <Route path="/MyBooks" element={<MyBooks />} />
                <Route path="/Settings" element={<Settings />} />
            </Routes>
        </div>
    );
}