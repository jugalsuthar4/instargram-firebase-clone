import React from 'react'
import { Router} from "@reach/router"
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import {AuthProvider} from "./contexts/AuthContext"

function App() {
  return (
  <AuthProvider>
    <Router>
       <Login path="/login" />
        <Home path="/" />
        <Signup path="/signup" />    
    </Router>
  </AuthProvider>
  )
}

export default App
