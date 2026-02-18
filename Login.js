import React, { useState } from "react";
import API from "./api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await API.post("token/", { username, password });
        localStorage.setItem("token", res.data.access);
        alert("Login Successful");
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
