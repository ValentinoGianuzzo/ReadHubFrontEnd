import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Style.css';
import '../Style/Global.css';

export default function MyBooks() {
    return (
        <div>
            <h1>My Books</h1>
            <p>Here are the books you have read</p>
            <Link to="/Dashboard">Volver a Dashboard</Link>
        </div>
    );
}
