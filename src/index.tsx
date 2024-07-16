import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import {AppProvider} from "./context";
import Settings from "./Rutas/Settings/Settings";
import MyBooks from "./Rutas/MyBooks";
import SignIn from "./authentication/signin/SignIn";
import SignUp from "./authentication/signup/SignUp";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Profile from "./profile/Profile";
import SearchForm from "./components/SearchForm/SearchForm";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="mybooks" element={<MyBooks/>}/>
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="book" element={<BookList/>}/>
                    <Route path="book/:id" element={<BookDetails/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="search" element={<DevSupport ComponentPreviews={ComponentPreviews}
                                                              useInitialHook={useInitial}
                    >
                        <SearchForm/>
                    </DevSupport>}/>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    </React.StrictMode>
);