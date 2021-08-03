import React, { useState } from "react";
import "./Signup.css";
import instagramLogo from "../images/instagram-text.svg";
import { Link } from "@reach/router";
import { ToastContainer, toast } from "react-toastify";
import {useAuth} from "../contexts/AuthContext"
import "react-toastify/dist/ReactToastify.css";
import {auth} from "../firebase"
import  {updateProfile } from "firebase/auth";
import {useNavigate} from '@reach/router'

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate()
  //console.log("useauth is ",useAuth())
  const {signup,currentUser}=useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("PASSWORD ARE NOT MATCHING !");
      return toast.error(`PASSWORD ARE NOT MATCHING`);
    }
   try {
         setError("");
         const authUser=await signup(email, password)
         authUser.user.updateProfile({
            displayName: username,
          }).then(() => {
            console.log("updated")
          }).catch((error) => {
            // An error occurred
            // ..
            console.log("not updated")
          });  
         toast.success("Account created successfully")
         navigate("/",{replace:true})
   } catch (error) {
         toast("something wronf")
         console.log(error.message)
   }
  };
  return (
    <div className="signup">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="signup__form">
        <img src={instagramLogo} alt="instagram-text-logo" />

        <form>
          <input
            type="text"
            placeholder="username"
            required
            autoCapitalize="off"
            maxlength="30"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />
          <button
            class="btn"
            type="submit"
            name="submit"
            disabled={false}
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
      </div>
      <div className="signup__login_link">
        <p>
          Already have an account ?
          <Link className="link" to="/login">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
