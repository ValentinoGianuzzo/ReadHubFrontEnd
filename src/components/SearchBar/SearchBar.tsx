import React, { ChangeEvent, FC } from 'react';

type Props = {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
};

const SearchBar: FC<Props> = ({ searchTerm, setSearchTerm }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='searchBarBox'>
            <input
                className='searchBar'
                type="text"
                placeholder="Search Book..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
