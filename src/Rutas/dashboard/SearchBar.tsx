import React from "react";
import './style.css'

type props = {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}

export default function SearchBar({searchTerm, setSearchTerm}: props) {
    return (
        <div className='searchBarBox'>
            <input
                className='searchBar'
                type="text"
                placeholder="Search Book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                hidden
            />
        </div>
    )
}