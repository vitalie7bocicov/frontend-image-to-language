import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, singInUser } from "../../services/authSerive";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (getCurrentUser() !== null) {
      navigate('/home');
    }
  })

  const onSubmit = async (values) => {
    if (email.length === 0) {
      setErrorMessage("Please insert your email!");
    }

    if (password.length === 0) {
      setErrorMessage("Please insert your password!");
    }

    try {
      await singInUser(email, password);

      navigate("/home");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrorMessage("User not found");
      } else if (err.code === "auth/wrong-password") {
        setErrorMessage("Wrong credentials");
      }
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
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder="Email"
                      ></Field>
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
                      ></Field>
                    </div>
                  </fieldset>

                  {errorMessage !== "" ? (
                    <div className="error-format">{errorMessage}</div>
                  ) : null}

                  <Link to="/sign-up">Create Account</Link>
                  <button className="findButton" type="submit">
                    Login
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
