import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import DefaultLayout from "../components/Layout/DefaultLayout"; // Ensure the path is correct

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Function to handle login
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
            if (user.token) {
                localStorage.setItem('token', user.token);
                navigate("/Main"); // Redirect to Main after successful login
            }
        } else {
            console.error("Error logging in:", response.statusText);
        }
    };

    return (
        <DefaultLayout>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={(e) => {
                    e.preventDefault();
                    login(email, password);
                }}>
                    <h1>Login</h1>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Sign In</button>
                </form>
            </div>
        </DefaultLayout>
    );
}
