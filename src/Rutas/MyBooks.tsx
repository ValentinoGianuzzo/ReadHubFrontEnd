import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        imageLinks: {
            thumbnail: string;
        };
    };
}

interface Goal {
    id: string;
    name: string;
    description: string;
    targetBooks: number;
    startDate: string;
    endDate: string;
    progress: number;
}

interface CustomList {
    id: string;
    name: string;
    books: Book[];
}

export default function MyBooks() {
    const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
    const [customLists, setCustomLists] = useState<CustomList[]>([]);
    const [newListName, setNewListName] = useState('');
    const [readingGoals, setReadingGoals] = useState<Goal[]>([]);
    const [newGoal, setNewGoal] = useState({
        name: '',
        description: '',
        targetBooks: 0,
        startDate: '',
        endDate: ''
    });

    const userId = localStorage.getItem('userId'); // Obtener userId de localStorage
    useEffect(() => {
        // Obtener userId del backend
        getUserIdFromBackend();
    }, []);

    const getUserIdFromBackend = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtener token de localStorage o de donde lo guardes
            const response = await axios.get('http://localhost:8080/user/getUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const id = response.data.id; // Obtener userId del backend
            fetchFavoriteBooks(id);
            fetchCustomLists(id);
            fetchReadingGoals(id);
        } catch (error) {
            console.error('Error obtaining userId:', error);
        }
    };

    const fetchFavoriteBooks = async (userId: string) => {
        try {
            const response = await axios.get(`/api/users/${userId}/favorites`);
            setFavoriteBooks(response.data); // Actualizar estado local de libros favoritos
        } catch (error) {
            console.error('Error fetching favorite books:', error);
        }
    };

    const fetchCustomLists = async (userId: string) => {
        try {
            const response = await axios.get(`/api/users/${userId}/lists`);
            setCustomLists(response.data); // Actualizar estado local de listas personalizadas
        } catch (error) {
            console.error('Error fetching custom lists:', error);
        }
    };

    const fetchReadingGoals = async (userId: string) => {
        try {
            const response = await axios.get(`/api/users/${userId}/goals`);
            setReadingGoals(response.data); // Actualizar estado local de objetivos de lectura
        } catch (error) {
            console.error('Error fetching reading goals:', error);
        }
    };

    const createNewList = async () => {
        try {
            const response = await axios.post(`/api/users/${userId}/lists`, { name: newListName });
            setCustomLists([...customLists, response.data]);
            setNewListName('');
        } catch (error) {
            console.error('Error creating new list:', error);
        }
    };

    const deleteList = async (listId: string) => {
        try {
            await axios.delete(`/api/users/${userId}/lists/${listId}`);
            setCustomLists(customLists.filter(list => list.id !== listId));
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    const createNewGoal = async () => {
        try {
            const response = await axios.post(`/api/users/${userId}/goals`, newGoal);
            setReadingGoals([...readingGoals, response.data]);
            setNewGoal({
                name: '',
                description: '',
                targetBooks: 0,
                startDate: '',
                endDate: ''
            });
        } catch (error) {
            console.error('Error creating new goal:', error);
        }
    };

    const deleteGoal = async (goalId: string) => {
        try {
            await axios.delete(`/api/users/${userId}/goals/${goalId}`);
            setReadingGoals(readingGoals.filter(goal => goal.id !== goalId));
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    return (
        <div>
            <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'blue', marginBottom: '20px', display: 'block' }}>Volver a Dashboard</Link>

            <h2>Mis Favoritos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {favoriteBooks.map(book => (
                    <div key={book.id} style={{ margin: '10px' }}>
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Cover of ${book.volumeInfo.title}`} style={{ maxHeight: '100px', maxWidth: '100px' }} />
                        <p>{book.volumeInfo.title}</p>
                        <p>{book.volumeInfo.authors.join(', ')}</p>
                    </div>
                ))}
            </div>

            <h2>Listas Personalizadas</h2>
            <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Nombre de la nueva lista"
            />
            <button onClick={createNewList}>Crear Lista</button>
            <div>
                {customLists.map(list => (
                    <div key={list.id} style={{ margin: '10px 0' }}>
                        <h3>{list.name}</h3>
                        <button onClick={() => deleteList(list.id)}>Borrar Lista</button>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {list.books.map(book => (
                                <div key={book.id} style={{ margin: '10px' }}>
                                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Cover of ${book.volumeInfo.title}`} style={{ maxHeight: '100px', maxWidth: '100px' }} />
                                    <p>{book.volumeInfo.title}</p>
                                    <p>{book.volumeInfo.authors.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <h2>Objetivos de Lectura</h2>
            <input
                type="text"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                placeholder="Nombre del objetivo"
            />
            <input
                type="text"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Descripción del objetivo"
            />
            <input
                type="number"
                value={newGoal.targetBooks}
                onChange={(e) => setNewGoal({ ...newGoal, targetBooks: parseInt(e.target.value) })}
                placeholder="Cantidad de libros"
            />
            <input
                type="date"
                value={newGoal.startDate}
                onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
            />
            <input
                type="date"
                value={newGoal.endDate}
                onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
            />
            <button onClick={createNewGoal}>Crear Objetivo</button>
            <div>
                {readingGoals.map(goal => (
                    <div key={goal.id} style={{ margin: '10px 0' }}>
                        <h3>{goal.name}</h3>
                        <p>{goal.description}</p>
                        <p>Progreso: {goal.progress}/{goal.targetBooks}</p>
                        <p>Fecha de inicio: {goal.startDate}</p>
                        <p>Fecha de fin: {goal.endDate}</p>
                        <button onClick={() => deleteGoal(goal.id)}>Borrar Objetivo</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
