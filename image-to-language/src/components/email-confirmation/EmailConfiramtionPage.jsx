import React from "react";
import { sendEmail, signOut } from "../../services/authSerive";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmailPage() {
    const navigate = useNavigate();

    const buttonTrigger = async () => {
        await sendEmail();
    }
    const logOut = async () => {
        await signOut();
        navigate('/sign-in');
    }

  return (
    <div className="container mainDiv d-flex justify-content-center">
      <div className="centerDiv col-12 col-sm-10 col-md-8 col-lg-6 my-auto customHeight">
        <h1>PhotoSpeak</h1>
        
        <p>Confirm email</p>
        <div>
            <button className="findButton" onClick={buttonTrigger}>Resend email</button>
            <button to="/sign-in" className="findButton" onClick={logOut}>Login</button>
        </div>
      </div>
    </div>
  );
}
