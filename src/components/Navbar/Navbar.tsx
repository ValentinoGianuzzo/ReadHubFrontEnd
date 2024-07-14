import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar: React.FC = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const handleNavbar = () => setToggleMenu(!toggleMenu);

    return (
        <nav className='navbar' id="navbar">
            <div className='container navbar-content flex'>
                <div className='brand-and-toggler flex flex-sb'>
                    <Link to="/" className='navbar-brand flex'>
                        <img src={logoImg} alt="site logo"/>
                        <span className='text-uppercase fw-7 fs-24 ls-1'>readhub</span>
                    </Link>
                    <button type="button" className='navbar-toggler-btn' onClick={handleNavbar}>
                        <HiOutlineMenuAlt3 size={35} style={{
                            color: `${toggleMenu ? "#fff" : "#010101"}`
                        }}/>
                    </button>
                </div>

                <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <Link to="book" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="about" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>About</Link>
                        </li>
                        {/* Add Sign In and Sign Up Links */}
                        <li className='nav-item'>
                            <Link to="/signin" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Sign In</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/signup" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;