import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field } from "formik";
import "antd/dist/antd.css";
import ChipInput from "./components/ChipInput";

ReactDOM.render(
  <React.StrictMode>
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => {
        // console.log(emails);
        values.email = "";
        // console.log(values.email);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <ChipInput name={"email"} />
          <Field name="text" />
        </Form>
      )}
    </Formik>
  </React.StrictMode>,
  document.getElementById("root")
);
