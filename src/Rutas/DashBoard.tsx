import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Profile from './Profile';
import MyBooks from './MyBooks';
import Settings from './Settings';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');


    return (
        <Router>
            <div className="home">
                <nav>
                    <ul>
                        <li><Link to="/profile">Perfil</Link></li>
                        <li><Link to="/mybooks">Mis Libros</Link></li>
                        <li><Link to="/settings">Configuración</Link></li>
                    </ul>
                </nav>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Buscar libro..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
                <>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/mybooks">
                        <MyBooks />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                </>
            </div>
        </Router>
    );
};

