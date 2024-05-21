import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import '../Style/Style.css';
import '../Style/Global.css';



interface PortalLayoutProps {
    children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
    const handleLogout = (e: MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = '/login';

    }
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/Dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/Profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/MyBooks">MyBooks</Link>
                        </li>
                        <li>
                            <Link to="/Settings">Settings</Link>
                        </li>
                        <li>
                            <a href="/" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>{children}</main>
        </>
    )
}