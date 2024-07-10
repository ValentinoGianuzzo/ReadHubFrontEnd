import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import StarRatings from 'react-star-ratings';

interface Book {
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        imageLinks: {
            thumbnail: string;
        };
        averageRating: number;
    };
}

interface Comment {
    id: string;
    user: string;
    text: string;
}

interface DetailProps {
    userId: string; // Propiedad para recibir el ID del usuario
}

const Detail: React.FC<DetailProps> = ({ userId }) => {
    const { bookId } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [readState, setReadState] = useState('No Leído');
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments/${bookId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchBook();
        fetchComments();
    }, [bookId]);

    useEffect(() => {
        // Verificar si el libro está en la lista de favoritos al cargar la página
        checkIfBookIsFavorite();
    }, []); // Solo se ejecuta una vez al cargar el componente

    const checkIfBookIsFavorite = async () => {
        try {
            // Verificar si existe la lista de favoritos para el usuario
            const checkListResponse = await axios.get(`/users/${userId}/lists/favorites`);

            if (checkListResponse.data) {
                // Si la lista de favoritos existe, verificar si el libro está en ella
                const favoritesListId = checkListResponse.data.id;
                const checkBookInFavorites = await axios.get(`/users/${userId}/lists/${favoritesListId}/books/${bookId}`);

                if (checkBookInFavorites.data) {
                    setIsFavorite(true);
                }
            }
        } catch (error) {
            console.error('Error checking if book is favorite:', error);
        }
    };
    const addToFavorites = async () => {
        try {
            // Verificar si existe la lista de favoritos para el usuario
            const checkListResponse = await axios.get(`/users/${userId}/lists/favorites`);
            let favoritesListId = null;

            if (!checkListResponse.data) {
                // Si no existe la lista de favoritos, crearla
                const createListResponse = await axios.post(`/users/${userId}/lists/createlist`, { name: "Favorites" });
                favoritesListId = createListResponse.data.id;
                console.log('Lista de favoritos creada');
            } else {
                // Si existe, obtener el ID de la lista de favoritos
                favoritesListId = checkListResponse.data.id;
            }

            // Verificar si el libro ya está en la lista de favoritos
            const checkBookInFavorites = await axios.get(`/users/${userId}/lists/${favoritesListId}/books/${bookId}`);

            if (checkBookInFavorites.data) {
                // Si el libro ya está en favoritos, eliminarlo
                await axios.delete(`/users/${userId}/lists/${favoritesListId}/books/${bookId}`);
                console.log('Libro eliminado de favoritos');
                setIsFavorite(false);
            } else {
                // Si el libro no está en favoritos, agregarlo
                await axios.post(`/users/${userId}/lists/${favoritesListId}/books/${bookId}`);
                console.log('Libro agregado a favoritos');
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error adding or removing from favorites:', error);
        }
    };


    const addToCustomList = async (listId: string) => {
        try {
            // Agregar el libro a una lista personalizada
            await axios.post(`/users/${userId}/lists/${listId}/books/${bookId}`);
            console.log('Libro agregado a lista personalizada');
            showCustomLists(); // Actualizar la lista personalizada mostrada (implementa esta función)
        } catch (error) {
            console.error('Error adding to custom list:', error);
        }
    };

    const showCustomLists = () => {
        console.log("Mostrar listas personalizadas");
        // Implementar lógica para mostrar listas personalizadas
    };

    const toggleReadState = () => {
        setReadState(prevState => {
            switch (prevState) {
                case 'Leído':
                    return 'Leyendo';
                case 'Leyendo':
                    return 'No Leído';
                default:
                    return 'Leído';
            }
        });
    };

    const changeRating = (newRating: number) => {
        setRating(newRating);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/comments/${bookId}`, { text: newComment });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div>
            <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'blue', marginBottom: '20px', display: 'block' }}>Volver a Dashboard</Link>
            {book ? (
                <>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={`Cover of ${book.volumeInfo.title}`}
                            style={{ marginTop: '60px', marginRight: '40px', marginLeft: '20px', maxHeight: '300px', maxWidth: '300px', minHeight: '300px', minWidth: '300px' }}
                        />
                        <div>
                            <h1>{book.volumeInfo.title}</h1>
                            <h2>{book.volumeInfo.authors.join(', ')}</h2>
                            <div className="bookDescription">
                                <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></div>
                            </div>
                            <button onClick={addToFavorites}>{isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}</button>
                            <button onClick={() => addToCustomList('listaId')}>Agregar a Lista Personalizada</button>
                            <button onClick={toggleReadState}>{readState}</button>
                        </div>
                    </div>
                    <div>
                        <p>Rating: {book.volumeInfo.averageRating}</p>
                        <StarRatings
                            rating={rating}
                            starRatedColor="blue"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <div>
                        <h2>Comments</h2>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea
                                placeholder="Write a comment..."
                                aria-label="Write a comment"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                            ></textarea>
                            <button type="submit">Submit</button>
                        </form>
                        <div>
                            {comments.map(comment => (
                                <div key={comment.id} style={{ marginTop: '10px', borderBottom: '1px solid #ccc' }}>
                                    <p><strong>{comment.user}</strong></p>
                                    <p>{comment.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Detail;
