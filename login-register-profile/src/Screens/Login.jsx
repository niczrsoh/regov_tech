import React,{useState, useContext} from "react";
import { UserProfile } from "./UserProfile";
import AppContext from "../Context/AppContext";
export const Login= (props) =>{
    const {user,setUser} = useContext(AppContext);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError] = useState('');
  
    const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });
    const data = await response.json();
    console.log(data);
    
    if (data.error) {
        console.log(data.error);
        setError(data.error);
    } else {
    setError('');
    setUser(data.userid);
    props.onSwitchLogin("success");
    }
    }
    return(

            <div className="auth-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={(handleSubmit)}>
                    
            <label for="email">Email</label>
            <input type="email"value={email} onChange={(e) => setEmail(e.target.value)} placeholder="myemail@gmail.com" id="email" name="email" />
            <label for="password">Password</label>
            <input type="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" />
            <br></br>
            <button>Log In</button>
        </form><br></br><button className="link" onClick={() => props.onForceSwitch("register")}>Don't have an account? Register here !</button></div>
);
}