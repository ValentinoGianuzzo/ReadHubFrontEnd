import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface UserProfileProps {
    userId: string;
}

const UserProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<any>(null);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [customLists, setCustomLists] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchUserFavorites = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}/favorites`);
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching user favorites:', error);
            }
        };

        const fetchUserCustomLists = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}/customLists`);
                setCustomLists(response.data);
            } catch (error) {
                console.error('Error fetching user custom lists:', error);
            }
        };

        fetchUserProfile();
        fetchUserFavorites();
        fetchUserCustomLists();
    }, [userId]);

    return (
        <div>
            {user ? (
                <div>
                    <h1>{user.username}</h1>
                    <h2>Favorites</h2>
                    <ul>
                        {favorites.map(book => (
                            <li key={book.id}>{book.title}</li>
                        ))}
                    </ul>
                    <h2>Custom Lists</h2>
                    {customLists.map(list => (
                        <div key={list.id}>
                            <h3>{list.name}</h3>
                            {/*<ul>*/}
                            {/*    {list.books.map(book => (*/}
                            {/*        <li key={book.id}>{book.title}</li>*/}
                            {/*    ))}*/}
                            {/*</ul>*/}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserProfile;
