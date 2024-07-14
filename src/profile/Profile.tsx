import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

interface DiaryEntry {
    id: number;
    content: string;
}

export default function Profile() {
    const [notes, setNotes] = useState<DiaryEntry[]>([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('/api/users/1/diary-entries');  // Ajusta el endpoint según tu API
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const createNote = async (userId: number, content: string) => {
        try {
            const response = await axios.post(`/api/users/${userId}/diary-entries`, { content });
            return response.data;  // Devuelve la nota creada
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;  // Manejo del error opcional
        }
    };


    const getUserNotes = async (userId: number) => {
        try {
            const response = await axios.get(`/api/users/${userId}/diary-entries`);
            return response.data;  // Devuelve la lista de notas del usuario
        } catch (error) {
            console.error('Error fetching user notes:', error);
            throw error;  // Manejo del error opcional
        }
    };
    const updateNote = async (entryId: number, content: string) => {
        try {
            const response = await axios.put(`/api/users/1/diary-entries/${entryId}`, { content });
            return response.data;  // Devuelve la nota actualizada
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;  // Manejo del error opcional
        }
    };

    const deleteNote = async (entryId: number) => {
        try {
            await axios.delete(`/api/users/1/diary-entries/${entryId}`);
            console.log('Note deleted successfully');
        } catch (error) {
            console.error('Error deleting note:', error);
            throw error;  // Manejo del error opcional
        }
    };


    const handleNoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdNote = await createNote(1, newNote);  // Aquí asumo que el usuario tiene ID 1
            setNotes([...notes, createdNote]);
            setNewNote('');
        } catch (error) {
            console.error('Error submitting note:', error);
        }
    };

    const handleDeleteNote = async (entryId: number) => {
        try {
            await deleteNote(entryId);
            setNotes(notes.filter(note => note.id !== entryId));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleEditNote = async (entryId: number, updatedContent: string) => {
        try {
            await updateNote(entryId, updatedContent);
            const updatedNotes = notes.map(note => {
                if (note.id === entryId) {
                    return { ...note, content: updatedContent };
                }
                return note;
            });
            setNotes(updatedNotes);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div>
            <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'blue', marginBottom: '20px', display: 'block' }}>Home</Link>
            <h2>Notas Personales</h2>
            <form onSubmit={handleNoteSubmit}>
                <textarea
                    placeholder="Escribe una nota..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                ></textarea>
                <button type="submit">Agregar Nota</button>
            </form>
            <div>
                {notes.map(note => (
                    <div key={note.id} style={{ marginTop: '10px', borderBottom: '1px solid #ccc' }}>
                        <p>{note.content}</p>
                        <button onClick={() => handleEditNote(note.id, 'Nuevo contenido')}>Modificar</button>
                        <button onClick={() => handleDeleteNote(note.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
