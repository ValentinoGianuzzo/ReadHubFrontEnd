import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import './style.css';

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
    userId: string;
    username: string;
    text: string;
    rating: number;
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
    const [showCommentBox, setShowCommentBox] = useState(false);

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
            const checkListResponse = await axios.get(`http://localhost:8080/users/${userId}/lists/favorites`);
            let favoritesListId = null;

            if (!checkListResponse.data) {
                // Si no existe la lista de favoritos, crearla
                const createListResponse = await axios.post(`http://localhost:8080/users/${userId}/lists/createlist`, { name: "Favorites" });
                favoritesListId = createListResponse.data.id;
                console.log('Lista de favoritos creada');
            } else {
                // Si existe, obtener el ID de la lista de favoritos
                favoritesListId = checkListResponse.data.id;
            }

            // Verificar si el libro ya está en la lista de favoritos
            const checkBookInFavorites = await axios.get(`http://localhost:8080/users/${userId}/lists/${favoritesListId}/books/${bookId}`);

            if (checkBookInFavorites.data) {
                // Si el libro ya está en favoritos, eliminarlo
                await axios.delete(`http://localhost:8080/users/${userId}/lists/${favoritesListId}/books/${bookId}`);
                console.log('Libro eliminado de favoritos');
                setIsFavorite(false);
            } else {
                // Si el libro no está en favoritos, agregarlo
                await axios.post(`http://localhost:8080/users/${userId}/lists/${favoritesListId}/books/${bookId}`);
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
            await axios.post(`http://localhost:8080/users/${userId}/lists/${listId}/books/${bookId}`);
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
            const response = await axios.post(`/api/comments/${bookId}`, { text: newComment, rating });
            setComments([...comments, response.data]);
            setNewComment('');
            setRating(0);
            setShowCommentBox(false);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'blue', marginBottom: '20px', display: 'block' }}>Volver a Dashboard</Link>
            {book ? (
                <>
                    <div className="bookDescription">
                        <img
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={`Cover of ${book.volumeInfo.title}`}
                        />
                        <div style={{ flex: 1 }}>
                            <h1 style={{ margin: '0 0 10px' }}>{book.volumeInfo.title}</h1>
                            <h2 style={{ margin: '0 0 20px', color: '#555' }}>{book.volumeInfo.authors.join(', ')}</h2>
                            <div style={{ marginBottom: '20px', color: '#333' }}>
                                <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}></div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <button onClick={addToFavorites} style={buttonStyle}>{isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}</button>
                                <button onClick={() => addToCustomList('listaId')} style={buttonStyle}>Agregar a Lista Personalizada</button>
                                <button onClick={toggleReadState} style={buttonStyle}>{readState}</button>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ margin: '0 0 10px' }}>Rating: {book.volumeInfo.averageRating}</p>
                        <StarRatings
                            rating={book.volumeInfo.averageRating}
                            starRatedColor="blue"
                            numberOfStars={5}
                            name='averageRating'
                            starDimension="30px"
                            starSpacing="5px"
                        />
                    </div>
                    <div>
                        <h2>Comments</h2>
                        <button onClick={() => setShowCommentBox(!showCommentBox)} style={buttonStyle}>Hacer Comentario</button>
                        {showCommentBox && (
                            <div className="comment-box">
                                <form onSubmit={handleCommentSubmit} style={{ marginBottom: '20px' }}>
                                    <StarRatings
                                        rating={rating}
                                        starRatedColor="blue"
                                        changeRating={changeRating}
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                    <textarea
                                        placeholder="Write a comment..."
                                        aria-label="Write a comment"
                                        value={newComment}
                                        onChange={e => setNewComment(e.target.value)}
                                    ></textarea>
                                    <button type="submit" style={buttonStyle}>Submit</button>
                                </form>
                            </div>
                        )}
                        <div>
                            {comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <p><Link to={`/profile/${comment.userId}`}><strong>{comment.username}</strong></Link> - <StarRatings
                                        rating={comment.rating}
                                        starRatedColor="blue"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="2px"
                                    /></p>
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

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

