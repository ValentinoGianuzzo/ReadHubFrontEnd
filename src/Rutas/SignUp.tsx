import { useState } from "react";
import { Navigate } from "react-router-dom";
import DefaultLayout from "../Layout/DefaultLayout";
import '../Style/Style.css';
import '../Style/Global.css';

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const createUser = async (email:string, firstName:string, lastName:string, password:string) => {
        const response = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, firstName, lastName, password })
        });

        if (response.ok) {
            const user = await response.json();
            console.log(user);
            if (user.token) {
                localStorage.setItem('token', user.token);
                setIsRegistered(true); // Cambiamos el estado a true al registrar correctamente
            }
        } else {
            console.error("Error al crear el usuario:", response.statusText);
        }

    };

    // Si el usuario está registrado, redirigimos a Dashboard
    if (isRegistered) {
        return <Navigate to="/Dashboard" />;
    }

    return (
        <DefaultLayout>
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                createUser(email, firstName, lastName, password);
            }}>
                <h1>SignUp</h1>

                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">SignUp</button>
            </form>
        </DefaultLayout>
    );
}
