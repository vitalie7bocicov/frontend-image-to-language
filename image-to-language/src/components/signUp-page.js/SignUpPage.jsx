import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import { createUser, sendEmail } from "../../services/authSerive";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function passwordVerification(password) {
    if(password.length < 6) {
        return false;
    }

    let ok = false;
    for(let i = 0; i < password.length; i++) {
        if(password[i] >= '0' && password <= '9') {
            ok = true;
        }
    }

    if(!ok) {
        return true;
    }
    else {
        return false;
    }
  }

  function passwordMatching(password, confirmPassword) {
    return password === confirmPassword;
  }

  const onSubmit = async (values) => {
    if (!isValidEmail(email)) {
        setErrorMessage("Invalid email format");
        return;
    }

    if(!passwordVerification(password)) {
        setErrorMessage("Invalid password format");
        return;
    }

    if(!passwordMatching(password, confirmPassword)) {
        setErrorMessage("Passwords do not match");
        return;
    }

    try {
      const user = await createUser(email, password);
      
      sendEmail();
      navigate('/confirm-email');
    }
    catch(err) {
        setErrorMessage("Email already in use");
    }
    
  };

  return (
    <div className="container mainDiv d-flex justify-content-center">
      <div className="centerDiv col-12 col-sm-10 col-md-8 col-lg-6 my-auto customHeight">
        <h1>PhotoSpeak</h1>
        <div>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="d-flex flex-column justify-content-center align-items-center height-control">
                  <fieldset className="form-group col-6 my-2">
                    <h4>Email</h4>
                    <div className="d-flex align-items-center">
                      <Field
                        type = "email"
                        name="email"
                        className="form-control"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder="Email"
                      >
                      </Field>
                      
                    </div>
                  </fieldset>
                  <fieldset className="form-group col-6 my-2">
                    <h4>Password</h4>
                    <div className="d-flex align-items-center">
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        placeholder="Password"
                      >
                      </Field>
                    </div>
                  </fieldset>

                  <fieldset className="form-group col-6 my-2">
                    <h4>Confirm Password</h4>
                    <div className="d-flex align-items-center">
                      <Field
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        value={confirmPassword}
                        placeholder="Confirm Password"
                      >
                      </Field>
                    </div>
                  </fieldset>
                  { errorMessage !== '' ? (
                        <div className="error-format">{errorMessage}</div>
                    ) : null}
                  <button className="findButton" type="submit">
                    Register    
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
