import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import MyBooks from './MyBooks';
import Settings from './Settings';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');

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
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search Book..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <Routes>
                <Route path="/Profile" element={<Profile />} />
                <Route path="/MyBooks" element={<MyBooks />} />
                <Route path="/Settings" element={<Settings />} />
            </Routes>
        </div>
    );
}
