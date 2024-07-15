import {useState} from "react";
import {Navigate} from "react-router-dom";
import DefaultLayout from "../../components/Layout/DefaultLayout";
import "./signUp.css";
import {TextFieldComponent} from "../../components/TextField/TextField";
import {Button} from "@mui/material";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const createUser = async (email: string, firstName: string, lastName: string, password: string) => {
        const response = await fetch("http://localhost:8080/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, firstName, lastName, password})
        });

        if (response.ok) {
            const user = await response.json(); //Aca recibo respuesta del backend!!!
            if (user.token && user.userId) {
                localStorage.setItem('token', user.token);
                setIsRegistered(true); // Cambiamos el estado a true al registrar correctamente
                localStorage.setItem('userId', user.userId); // Guardamos el id del usuario en localStorage
            }
        } else {
            console.error("Error al crear el usuario:", response.statusText);
        }
    };

    // Si el usuario está registrado, redirigimos a Dashboard
    if (isRegistered) {
        return <Navigate to="/signin"/>;
    }

    return (
        <DefaultLayout>
            <div className={"superContainer"}>
                <div className={"signupContainer"}>
                    <div className={"loginTitleDiv"}>
                        <h2 className={"loginH1"}>Sign Up</h2>
                    </div>

                    <div className={"textFields"}>
                        <TextFieldComponent onChange={(e) => setFirstName(e.target.value)} variant={"standard"}
                                            label={"First name"} labelColor={"white"}></TextFieldComponent>
                        <TextFieldComponent onChange={(e) => setLastName(e.target.value)} variant={"standard"}
                                            label={"Last name"} labelColor={"white"}></TextFieldComponent>
                        <TextFieldComponent onChange={(e) => setEmail(e.target.value)} variant={"standard"}
                                            label={"E-mail"} labelColor={"white"}></TextFieldComponent>
                        <TextFieldComponent onChange={(e) => setPassword(e.target.value)} variant={"filled"}
                                            label={"Password"} labelColor={"white"}
                                            type={"password"}></TextFieldComponent>
                    </div>
                    <div className={"signupButtonDiv"}>
                        <Button className={"signupButton"} onClick={() => createUser(email, firstName, lastName, password)}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
/* tengo que agregar aca un default layout, averiguar si es la pagina de inicio o la de registro */