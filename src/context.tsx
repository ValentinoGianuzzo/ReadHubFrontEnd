import React, { useState, useContext, useEffect, ReactNode } from 'react';
import axios from "axios";

interface AppContextType {
    loading: boolean;
    books: any[];
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    resultTitle: string;
    setResultTitle: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: AppContextType = {
    loading: false,
    books: [],
    setSearchTerm: () => {},
    resultTitle: '',
    setResultTitle: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultContextValue);

const generalQuery = 'a';

const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultTitle, setResultTitle] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10`);
            const filteredResults = response.data.items.filter((item: any) => item.volumeInfo.imageLinks);
            setBooks(filteredResults || []);
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
        setLoading(false);
    };

    const fetchDefaultBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${generalQuery}&maxResults=20&orderBy=relevance`);
            const filteredResults = response.data.items.filter((item: any) => item.volumeInfo.imageLinks);
            setBooks(filteredResults || []);
        } catch (error) {
            console.error('Error al obtener libros por defecto:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (searchTerm) {
            handleSearch();
        } else {
            fetchDefaultBooks();
        }
    }, [searchTerm]);

    return (
        <AppContext.Provider value={{
            loading,
            books,
            setSearchTerm,
            resultTitle,
            setResultTitle,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
