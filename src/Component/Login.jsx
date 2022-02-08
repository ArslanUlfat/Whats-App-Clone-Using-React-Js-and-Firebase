import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../firebase-conf";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import "./Login.css";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img src="https://static.whatsapp.net/rsrc.php/yz/r/lOol7j-zq4u.svg" />
        <div className="login_text">
          <h1>Sign In to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
