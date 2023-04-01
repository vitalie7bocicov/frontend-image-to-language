import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./MainPage.css";

const ImageUploadField = ({ field, form, ...props }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    form.setFieldValue(field.name, file);
  };

  return (
    <div>
      <label htmlFor={field.name}>{props.label}</label>
      <input
        id={field.name}
        name={field.name}
        type="file"
        onChange={handleImageChange}
      />
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default function MainPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const generatePage = () => {
    Cookies.set("lang", language);
    navigate("/generated-page");
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="container mainDiv d-flex justify-content-center">
      <div className="centerDiv col-12 col-sm-10 col-md-8 col-lg-6 my-auto">
        <h1>PhotoSpeak</h1>
        <div>
          <Formik
            initialValues={{ image: null, language: "english" }}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {(props) => (
              <Form>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <fieldset className="form-group col-4 my-4">
                    <h4>Choose a language!</h4>
                    <div className="d-flex align-items-center">
                      <Field
                        name="language"
                        as="select"
                        className="form-control"
                        onChange={(e) => {
                          setLanguage(e.target.value);
                        }}
                        value={language}
                      >
                        <option value="en">English</option>
                        <option value="ro">Romanian</option>
                        <option value="es">Spanish</option>
                        <option value="ru">Russian</option>
                      </Field>
                    </div>
                  </fieldset>
                  <h4>Upload a picture!</h4>
                  <fieldset className="form-group col-4">
                    <Field name="image" component={ImageUploadField} />
                  </fieldset>
                  {props.errors.image && <div>{props.errors.image}</div>}
                  <button
                    className="findButton"
                    type="button"
                    onClick={generatePage}
                  >
                    Find Words
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
