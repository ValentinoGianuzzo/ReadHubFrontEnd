import React, {useRef, useEffect, FC} from 'react';
import {FaSearch} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import "./SearchForm.css";
import {useGlobalContext} from "../../context";

const SearchForm: FC = () => {
    const {setSearchTerm, setResultTitle} = useGlobalContext();
    const searchText = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        searchText.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let tempSearchTerm = searchText.current?.value.trim() ?? '';
        if ((tempSearchTerm.replace(/[^\w\s]/gi, "")).length === 0) {
            setSearchTerm("Search book...");
            setResultTitle("Please Enter Something ...");
        } else {
            setSearchTerm(tempSearchTerm);
        }

        navigate("/books");
    };

    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-content'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search-form-elem flex flex-sb bg-white'>
                            <input type="text" className='form-control' placeholder='Search book ...'
                                   ref={searchText}/>
                            <button type="submit" className='flex flex-c'>
                                <FaSearch className='text-purple' size={32}/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SearchForm;