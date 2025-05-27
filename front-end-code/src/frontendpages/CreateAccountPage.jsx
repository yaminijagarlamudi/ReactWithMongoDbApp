import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth ,createUserWithEmailAndPassword} from "firebase/auth"

export default function CreateAccountPage()
{

    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[error,setError] = useState('');

    const navigate =useNavigate();


    async function createAccount () {
       
        if(password !== confirmPassword)
            {
                setError('Password and confirm password must match!!');
                return
            } 
        try {
            
            await createUserWithEmailAndPassword(getAuth(),email,password); 
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
             <input placeholder="Confirm password"
            type= 'password'
            value = {confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)} />
            <button onClick={createAccount}>Create Account</button>
            <Link to ='/login'>Already have an account.Login here!!</Link>
          
        </>
    )
    ;
}