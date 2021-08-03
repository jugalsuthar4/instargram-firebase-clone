import React,{useState} from 'react'
import "./Login.css"
import instagramLogo from "../images/instagram-text.svg"
import {Link, navigate} from "@reach/router"
import {useAuth} from "../contexts/AuthContext"
import  {useNavigate} from "@reach/router"

function Login() {
    const {currentUser,login}=useAuth()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const navigate=useNavigate()

    const handleLogin=async (e)=>{
        e.preventDefault()
        
        try{
            setError("")
            const authUser=await login(email,password)
            alert("login successful")
            navigate("/",{replace:true})
        }
        catch(err){
               alert(err.message)
        }
    }
    return (
        <div className="login">
        
            <div className="login__form">
            <img src={instagramLogo} alt="instagram-text-logo"/>

                <form>
                   <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/><br/><br/>
                   <input type="password" placeholder="Password" required value={password} onChange={e=>setPassword(e.target.value)}/><br/><br/>
                   <button class="btn" type="submit" name="submit" onClick={handleLogin}>Log in</button>
                </form>
            <p>Forgot Password ?</p>
            </div>
            <div className="login__signup_link">
                 <p>Dont have an account ? <Link className="link" to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}

export default Login



