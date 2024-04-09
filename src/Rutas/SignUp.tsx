import DefaultLayout from "../Layout/DefaultLayout";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {useAuthentication} from "../Authentication/AuthenticationProvider";


export default function SignUp() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const Authentication = useAuthentication();

    if(Authentication.isAuthenticated){
        return <Navigate to="/Dashboard" />;
    }

    // Function to create a user
    const createUser = async (name: string, lastname: string, email: string, username: string, password: string) => {
        const response = await fetch("http://localhost:3001/SignUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, lastname, email, username, password})
        });

        if(response.ok){
            const user = await response.json();
            console.log(user);
        }
    }

    return(
        <DefaultLayout>
            <form className="form">
                <h1>SignUp</h1>

                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label>Lastname</label>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>

                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <label>Password</label>
                <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button onClick={() => createUser(name, lastname, email, username, password)}>SignUp</button>
            </form>
        </DefaultLayout>
    );

}