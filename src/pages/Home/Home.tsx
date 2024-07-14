import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";

const Home: React.FC = () => {
    return (
        <main>
            <Header />
            <Outlet />
            {/*<Main />*/}
        </main>
    );
}

export default Home;