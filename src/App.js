import React, { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const App = (props) => {
  useEffect(() => {
    console.log(props);
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>FormApp</h1>
      </header>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form className="form">
            <div>
              <label>First Name</label>
              <Field name="firstName" data-testid="firstName" />
              {errors.firstName && touched.firstName ? (
                <div className="formError" data-testid="formError">
                  {errors.firstName}
                </div>
              ) : null}
            </div>

            <div>
              <label>Last Name</label>
              <Field name="lastName" data-testid="lastName" />
              {errors.lastName && touched.lastName ? (
                <div className="formError" data-testid="formError">
                  {errors.lastName}
                </div>
              ) : null}
            </div>

            <div>
              <label>Email</label>
              <Field name="email" type="email" data-testid="email" />
              {errors.email && touched.email ? (
                <div className="formError" data-testid="formError">
                  {errors.email}
                </div>
              ) : null}
            </div>
            {isValid ? <div>True</div> : <div>False</div>}
            <button type="submit" data-testid="submitButton">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
