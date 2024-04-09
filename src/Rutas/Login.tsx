import DefaultLayout from "../Layout/DefaultLayout";
import {useState} from "react";
import {useAuthentication} from "../Authentication/AuthenticationProvider";
import {Navigate} from "react-router-dom";


export default function Login() {
    const[username, setUsername] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const Authentication = useAuthentication();

    if(Authentication.isAuthenticated){
        return <Navigate to="/Dashboard" />;
    }

    return(
        <DefaultLayout>
            <form className="form">
                <h1>Login</h1>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) =>setUsername(e.target.value)}/>

                <label>Password</label>
                <input type="Password" value={password} onChange={(e) =>setPassword(e.target.value)}/>

                <button onClick={() => login(username, password)}>Login</button>
            </form>
        </DefaultLayout>
        
    );  
}

// Function to log in
const login = async (username: string, password: string) => {
    const response = await fetch("http://localhost:3001/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    });

    if(response.ok){
        const user = await response.json();
        console.log(user);
    }
}





