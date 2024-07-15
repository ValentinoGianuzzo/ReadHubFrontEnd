import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/Layout/DefaultLayout"; // Ensure the path is correct
import "./signIn.css";
import {TextFieldComponent} from "../../components/TextField/TextField";
import {Button} from "@mui/material";

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
                navigate("/"); // Redirect to Home page
            }
        } else {
            console.error("Error logging in:", response.statusText);
        }
    };

    return (
        <DefaultLayout>
            <div className={"superContainer"}>
                <div className={"loginContainer"}>
                    <div className={"loginTitleDiv"}>
                        <h2 className={"loginH1"}>Sign In</h2>
                    </div>

                    <div className={"textFields"}>
                            <TextFieldComponent onChange={(e) => setEmail(e.target.value)} variant={"standard"} label={"E-mail"} labelColor={"white"}></TextFieldComponent>
                            <TextFieldComponent onChange={(e) => setPassword(e.target.value)} variant={"filled"} label={"Password"} labelColor={"white"} type={"password"}></TextFieldComponent>
                    </div>

                    <div className={"loginButtonDiv"}>
                        <Button className={"loginButton"} onClick={() => login(email, password)}>Sign In</Button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
