import React, { useRef, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import "./SearchForm.css";

const SearchForm: React.FC = () => {
    const { setSearchTerm, setResultTitle } = useGlobalContext();
    const searchText = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        if (searchText.current) {
            searchText.current.focus();
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tempSearchTerm = searchText.current?.value.trim() ?? '';
        if ((tempSearchTerm.replace(/[^\w\s]/gi, "")).length === 0) {
            setSearchTerm("a");
            setResultTitle("Please Enter Something ...");
        } else {
            setSearchTerm(tempSearchTerm);
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${tempSearchTerm}&maxResults=10`);
                const filteredResults = response.data.items.filter((item: any) => item.volumeInfo.imageLinks);
                setSearchResults(filteredResults || []);
                setResultTitle(`Results for "${tempSearchTerm}"`); /* If I want to change the color to this text, I can add a class to the h2 tag in BookList.tsx */
            } catch (error) {
                console.error('Error searching books:', error);
            }
        }
        navigate("/book");
    };

    return (
        <div className='search-form'>
            <div className='searchContainer'>
                <div className='search-form-content'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search-form-elem flex flex-sb bg-white'>
                            <input type = "text" className='form-control' placeholder='Search Book ...' ref = {searchText} />
                            <button type = "submit" className='flex flex-c'>
                                <FaSearch className='text-purple' size = {32} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SearchForm;
