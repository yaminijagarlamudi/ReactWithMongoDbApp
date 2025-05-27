import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth ,signInWithEmailAndPassword} from "firebase/auth"

export default function LoginPage()
{

    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[error,setError] = useState('');

    const navigate =useNavigate();


    async function login () {
        try {
            await signInWithEmailAndPassword(getAuth(),email,password); 
            navigate('/articles');      
        }
        catch(e){
            setError(e.message);
        }
        
    }
    return (
        <>
            <h1>Log In</h1>
            {error && <p>{error}</p>}
            <input placeholder="Please provide email"
            value = {email}
            onChange={e =>setEmail(e.target.value)} />
            <input placeholder="Please enter your password"
            type= 'password'
            value = {password}
            onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Log In</button>
            <Link to ='/create-account'>Don't have one. Create account here!!</Link>
        </>
    )
    ;
}