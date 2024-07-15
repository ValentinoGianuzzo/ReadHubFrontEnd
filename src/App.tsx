import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./authentication/AuthContext";
import ProtectedRoute from "./Rutas/ProtectedRoute";
import React from "react";
import Home from "./pages/Home/Home";
import SignIn from "./authentication/signin/SignIn";
import SignUp from "./authentication/signup/SignUp";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                    {/* Other routes */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;