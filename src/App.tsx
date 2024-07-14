import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import { AuthProvider } from "./authentication/AuthContext";
import SignIn from "./authentication/SignIn";
import ProtectedRoute from "./Rutas/ProtectedRoute";
import React from "react";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/main" element={<ProtectedRoute component={Main} />} />
                    {/* Other routes */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;