import DefaultLayout from "../Layout/DefaultLayout";
import { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Función para manejar el inicio de sesión
    const login = async (email: string, password: string) => {
        const response = await fetch("http://localhost:8080/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const user = await response.json();
            console.log(user);
            if (user.token) {
                localStorage.setItem('token', user.token);
                navigate("/Dashboard"); // Redirigimos a Dashboard al iniciar sesión correctamente
            }
        } else {
            console.error("Error al iniciar sesión:", response.statusText);
        }
    };

    return (
        <DefaultLayout>
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                login(email, password);
            }}>
                <h1>Login</h1>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Login</button>
            </form>
        </DefaultLayout>
    );
}
