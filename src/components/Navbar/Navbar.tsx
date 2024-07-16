import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar: React.FC = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const handleNavbar = () => setToggleMenu(!toggleMenu);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token); /* the !! is because the value of token is either a string or null */
    }, []);   /* the [] is because we only want this to run once when the component mounts */

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        return <Navigate to="/signin"/>;
    }

    return (
        <nav className='navbar' id="navbar">
            <div className='container navbar-content flex'>
                <div className='brand-and-toggler flex flex-sb'>
                    <Link to="/" className='navbar-brand flex'>
                        <img src={logoImg} alt="site logo"/>
                        <span className='text-uppercase fw-7 fs-24 ls-1'>readhub</span>
                    </Link>
                    <button type="button" className='navbar-toggler-btn' onClick={handleNavbar}>
                        <HiOutlineMenuAlt3 size={35} style={{color: `${toggleMenu ? "#fff" : "#4C3021"}`}}/>
                    </button>
                </div>

                <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
                    <ul className="navbar-nav">
                        {isAuth ? (
                            <>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>About</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/profile" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Profile</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/settings" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Settings</Link>
                                </li>
                                <li className='nav-item'>
                                    <button onClick={handleSignOut} className='nav-link text-uppercase text-white fs-22 fw-6 ls-1' style={{background: 'none', border: 'none'}}>Sign Out</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link to="/" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>About</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/signin" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Sign In</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/signup" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
