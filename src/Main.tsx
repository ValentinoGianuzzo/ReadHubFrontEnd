import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import axios from "axios";
import Card from "./Card"

const Main: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [bookData, setData] = useState<any[]>([]); // Change 'any[]' to the type of your book data

    const searchBook = (evt: KeyboardEvent<HTMLInputElement>): void => {
        if (evt.key === "Enter") {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyAmZ0tOgJqrVckyi2w3zWj0pip0Jg-X-AE&maxResults=40`)
                .then((res) => setData(res.data.items))
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>A room without books is like a body without a soul.</h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Enter Your Book Name"
                            value={search}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                            onKeyPress={searchBook}
                        />
                        <button>
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <img src="./images/bg2.png" alt="" />
                </div>
            </div>

            <div className="container">
                <Card book={bookData} />
            </div>
        </>
    );
};

export default Main;