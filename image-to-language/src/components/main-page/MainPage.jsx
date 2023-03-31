import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";

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
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="container">
      <h1>Upload a photo!</h1>
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
                <fieldset className="form-group col-6">
                  <Field name="image" component={ImageUploadField} />
                </fieldset>
                <fieldset className="form-group col-6 my-4">
                  <div className="d-flex">
                    <label htmlFor="language">Language:</label>
                    <Field name="language" as="select" className="form-control">
                      <option value="en">English</option>
                      <option value="ro">Romanian</option>
                      <option value="es">Spanish</option>
                      <option value="ru">Russian</option>
                    </Field>
                  </div>
                </fieldset>
                {props.errors.image && <div>{props.errors.image}</div>}
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
