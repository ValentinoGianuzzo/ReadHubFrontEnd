import { ReactNode } from "react";
import Navbar from "../Navbar/Navbar"; // Ensure the path is correct
import './Global.css';

interface DefaultLayoutProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <Navbar /> {/* Use the Navbar component */}
            <main>{children}</main>
        </>
    );
}
