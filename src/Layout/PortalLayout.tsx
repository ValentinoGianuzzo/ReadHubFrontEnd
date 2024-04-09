import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import {useAuthentication} from "../Authentication/AuthenticationProvider";



interface PortalLayoutProps {
    children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
    const Authentication = useAuthentication();
    const handleLogout = (e: MouseEvent) => {
        e.preventDefault();
       // Authentication.logout();
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