import React,{useState} from "react";
export const Register= (props) =>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [phone,setPhone]=useState('');
    const [error,setError] = useState('');
    const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password ,phone}),
        });
    const data = await response.json();
    console.log(data);

    if(data.error){
        setError(data.error);
    } else {
        return 
    }
    }
    return(
        <div className="auth-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={(handleSubmit)}>
            <label htmlFor="name">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="full name" id="name" name="name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="myemail@gmail.com" id="email" name="email" />
            <label for="password">Password</label>
            <input type="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******" id="password" name="password" />
            <label for="phone">Phone</label>
            <input type="tel"value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-213210312" id="phone" name="phone" />
            <br></br>
            <button type="submit">Submit</button>

        </form><button className="link" onClick={() => props.onForceSwitch('login')}>Already Have an account? Login Here!</button></div>
    );
}