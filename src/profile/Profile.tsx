import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultLayout from "../components/Layout/DefaultLayout";
import './Profile.css'; // Archivo CSS para los estilos del Profile

interface DiaryEntry {
    id: number;
    content: string;
    date: string;
}

interface Book {
    id: number;
    title: string;
    author: string;
    cover_img: string;
}

interface CustomList {
    id: number;
    name: string;
    books: Book[];
}

interface Comment {
    id: number;
    bookId: number;
    content: string;
}

interface ReadingGoal {
    id: number;
    goalName: string;
    description: string;
    startDate: string;
    endDate: string;
    goalTarget: number;
    goalProgress: number;
}

const Profile: React.FC = () => {
    const userId = localStorage.getItem('userId');  // Obtener el ID del usuario desde localStorage

    const [notes, setNotes] = useState<DiaryEntry[]>([]);
    const [newNote, setNewNote] = useState('');
    const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
    const [customLists, setCustomLists] = useState<CustomList[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [readingGoals, setReadingGoals] = useState<ReadingGoal[]>([]);
    const [isPublicProfile, setIsPublicProfile] = useState(true);  // Estado para manejar la privacidad del perfil

    // Estados para el formulario de creación de metas de lectura
    const [goalName, setGoalName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [goalTarget, setGoalTarget] = useState<number | ''>('');

    useEffect(() => {
        if (userId) {
            fetchNotes();
            fetchFavoriteBooks();
            fetchCustomLists();
            fetchComments();
            fetchReadingGoals();
        }
    }, [userId]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}/diary-entries`);
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const createNote = async (content: string) => {
        const date = new Date().toISOString(); // Obtener la fecha actual en formato ISO
        try {
            const response = await axios.post(`http://localhost:8080/users/${userId}/diary-entries`, { content, date, userId });
            const createdNote = response.data;
            setNotes([...notes, createdNote]);
            setNewNote('');  // Limpiar el contenido del textarea después de agregar la nota
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const deleteNote = async (entryId: number) => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}/diary-entries/${entryId}`);
            setNotes(notes.filter(note => note.id !== entryId));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const updateNote = async (entryId: number, updatedContent: string) => {
        try {
            const response = await axios.put(`http://localhost:8080/users/${userId}/diary-entries/${entryId}`, { content: updatedContent });
            const updatedNote = response.data;
            setNotes(notes.map(note => (note.id === entryId ? updatedNote : note)));
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleCreateNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newNote.trim() !== '') {
            createNote(newNote);
        } else {
            console.error('El contenido de la nota no puede estar vacío');
        }
    };

    const fetchFavoriteBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}/favorite-books`);  // Ajusta el endpoint según tu API
            setFavoriteBooks(response.data);
        } catch (error) {
            console.error('Error fetching favorite books:', error);
        }
    };

    const fetchCustomLists = async () => {
        try {
            const response = await axios.get(`/api/users/${userId}/custom-lists`);  // Ajusta el endpoint según tu API
            setCustomLists(response.data);
        } catch (error) {
            console.error('Error fetching custom lists:', error);
        }
    };

    const createCustomList = async (listName: string) => {
        try {
            const response = await axios.post(`http://localhost:8080/users/${userId}/lists/createlist`, { name: listName });  // Ajusta el endpoint según tu API
            const newList = response.data;
            setCustomLists([...customLists, newList]);
        } catch (error) {
            console.error('Error creating custom list:', error);
        }
    };

    const deleteCustomList = async (listId: number) => {
        try {
            await axios.delete(`http://localhost:8080/users/${userId}/lists/${listId}`);  // Ajusta el endpoint según tu API
            setCustomLists(customLists.filter(list => list.id !== listId));
        } catch (error) {
            console.error('Error deleting custom list:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/users/${userId}/comments`);  // Ajusta el endpoint según tu API
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchReadingGoals = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${userId}/goals`);  // Ajusta el endpoint según tu API
            setReadingGoals(response.data);
        } catch (error) {
            console.error('Error fetching reading goals:', error);
        }
    };

    const createReadingGoal = async () => {
        if (!goalName || !description || !startDate || !endDate || !goalTarget) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const newGoal = {
            goalName,
            description,
            startDate,
            endDate,
            goalTarget,
            userId
        };

        try {
            const response = await axios.post(`http://localhost:8080/users/${userId}/goals`, newGoal);
            const createdGoal = response.data;
            setReadingGoals([...readingGoals, createdGoal]);
            // Limpiar los campos del formulario
            setGoalName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setGoalTarget('');
        } catch (error) {
            console.error('Error creating reading goal:', error);
        }
    };

    const handleCreateListSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const listName = formData.get('listName') as string;

        if (listName.trim() !== '') {
            await createCustomList(listName);
            e.currentTarget.reset(); // Limpiar el formulario después de crear la lista
        } else {
            console.error('El nombre de la lista no puede estar vacío');
        }
    };

    const handleCreateGoalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createReadingGoal();
    };

    const togglePrivacy = () => {
        setIsPublicProfile(!isPublicProfile);
    };

    return (
        <DefaultLayout>
            <div className="profile-container">
                {/* Sección de Notas Personales */}
                <div className="notes-section">
                    <h2>Notas Personales</h2>
                    <form onSubmit={handleCreateNoteSubmit}>
                        <textarea
                            placeholder="Escribe una nota..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                        ></textarea>
                        <button type="submit">Agregar Nota</button>
                    </form>
                    <div className="note-list">
                        {notes.map(note => (
                            <div key={note.id} className="note-item">
                                <p>{note.content}</p>
                                <small>{new Date(note.date).toLocaleString()}</small>
                                <div className="note-actions">
                                    <button onClick={() => updateNote(note.id, 'Nuevo contenido')}>Modificar</button>
                                    <button onClick={() => deleteNote(note.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de Libros Favoritos */}
                <div className="favorites-section">
                    <h2>Libros Favoritos</h2>
                    <div className="favorite-books">
                        {favoriteBooks.map(book => (
                            <div key={book.id} className="favorite-book">
                                <img src={book.cover_img} alt={book.title} />
                                <p>{book.title} by {book.author}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de Listas Personalizadas */}
                <div className="custom-lists-section">
                    <h2>Listas Personalizadas</h2>
                    <form onSubmit={handleCreateListSubmit}>
                        <input type="text" name="listName" placeholder="Nombre de la lista" />
                        <button type="submit">Crear Lista</button>
                    </form>
                    <div className="custom-lists">
                        {customLists.map(list => (
                            <div key={list.id} className="custom-list">
                                <p>{list.name}</p>
                                <button onClick={() => deleteCustomList(list.id)}>Eliminar Lista</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de Comentarios */}
                <div className="comments-section">
                    <h2>Comentarios</h2>
                    <div className="comments">
                        {comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección de Metas de Lectura */}
                <div className="reading-goals-section">
                    <h2>Metas de Lectura</h2>
                    <form onSubmit={handleCreateGoalSubmit}>
                        <input
                            type="text"
                            placeholder="Nombre de la Meta"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                        />
                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <input
                            type="date"
                            placeholder="Fecha de Inicio"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Fecha de Fin"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Libros Objetivo"
                            value={goalTarget}
                            onChange={(e) => setGoalTarget(Number(e.target.value))}
                        />
                        <button type="submit">Crear Meta</button>
                    </form>
                    <div className="reading-goals">
                        {readingGoals.map(goal => (
                            <div key={goal.id} className="reading-goal">
                                <p>{goal.goalName}: {goal.goalProgress}/{goal.goalTarget}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón de Privacidad */}
                <div className="privacy-toggle">
                    <button onClick={togglePrivacy}>
                        {isPublicProfile ? 'Hacer Privado' : 'Hacer Público'}
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;
