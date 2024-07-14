import React from 'react';
import { useParams } from 'react-router-dom';

interface BookDetails {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        imageLinks?: {
            thumbnail: string;
        };
        previewLink: string;
        averageRating?: number;
    };
}

const SelectedBook: React.FC<{ books: BookDetails[] }> = ({ books }) => {
    const { bookId } = useParams<{ bookId: string }>();
    const selectedBook = books.find(book => book.id === bookId);

    if (!selectedBook) {
        return <div>Libro no encontrado</div>;
    }

    return (
        <div className="selected-book">
            <img src={selectedBook.volumeInfo.imageLinks?.thumbnail} alt={selectedBook.volumeInfo.title} />
            <h2>{selectedBook.volumeInfo.title}</h2>
            <h3>Autores: {selectedBook.volumeInfo.authors.join(', ')}</h3>
            <p>{selectedBook.volumeInfo.description}</p>
            <p>Editorial: {selectedBook.volumeInfo.publisher}</p>
            <p>Fecha de Publicación: {selectedBook.volumeInfo.publishedDate}</p>
            {selectedBook.volumeInfo.averageRating && (
                <p>Calificación Promedio: {selectedBook.volumeInfo.averageRating}</p>
            )}
            <button>Comentar</button>
            <button>Dejar Reseña</button>
            <button>Agregar a Favoritos</button>
        </div>
    );
};

export default SelectedBook;
