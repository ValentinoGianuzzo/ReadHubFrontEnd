import React, { useState, useEffect } from 'react';

function setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
}

export default function Toggle() {
    const [togClass, setTogClass] = useState('');

    const handleOnClick = () => {
        if (togClass === 'dark') {
            setTheme('theme-light');
            setTogClass('light');
        } else {
            setTheme('theme-dark');
            setTogClass('dark');
        }
    };

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'theme-dark') {
            setTogClass('dark');
        } else if (theme === 'theme-light') {
            setTogClass('light');
        }
    }, []);

    return (
        <div className="container--toggle">
            <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked={togClass === 'light'} />
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label>
        </div>
    );
}
