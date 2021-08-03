import React from 'react'
import "./Home.css"
import Header from "./Header"
import Posts from "./Posts"
import {useAuth} from "../contexts/AuthContext"
import Post from './Post'
import Login from "./Login"



function Home() {
    const {currentUser} =useAuth()
    
    return (
        <div className="home">
          
           {
               currentUser ? <><Header/><Posts/></> : <Login/>
           }
        </div>
    )
}

export default Home
