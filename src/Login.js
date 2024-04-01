import "./Login.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { auth, provider } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";

function Login() {
    const dispatch = useDispatch();
    const SignIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid,

                })
            );
        })
        .catch(error => alert(error.message));
    };

  return (
    <div className="login">
        <div className="login__container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGGSbNOn3r3j1xyPqbANtIuhg15t-BkNe8H1AXRNpjQ&s" altr=""/>
            <Button onClick={SignIn} > Sign In </Button>
        </div>
    </div>
  )
}

export default Login
