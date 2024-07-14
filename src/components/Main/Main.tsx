import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from "../../components/common/Card";
import axios from "axios";
import './Main.css';
import DefaultLayout from "../Layout/DefaultLayout";
import SearchForm from "../SearchForm/SearchForm";

const generalQuery = 'a'; // A generic query to get a variety of books

const Main = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [defaultBooks, setDefaultBooks] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10`);
            const filteredResults = response.data.items.filter((item: any) => item.volumeInfo.imageLinks);
            setSearchResults(filteredResults || []);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const fetchDefaultBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${generalQuery}&maxResults=20&orderBy=relevance`);
            const filteredResults = response.data.items.filter((item: any) => item.volumeInfo.imageLinks);
            setDefaultBooks(filteredResults || []);
        } catch (error) {
            console.error('Error fetching default books:', error);
        }
    };

    useEffect(() => {
        fetchDefaultBooks();
    }, []);

    return (
        <DefaultLayout>
            <div className='headerMain'>
                <div className="row1">
                    <h1>A room without books is like a body without a soul.</h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <form
                        className='formBox'
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}>
                        <SearchForm />
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
            </div>
        </DefaultLayout>
    );
};

export default Main;
