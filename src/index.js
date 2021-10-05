import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form } from "formik";
import "antd/dist/antd.css";
import ChipInput from "./components/ChipInput";
// import Example from "./components/formik";

ReactDOM.render(
  <React.StrictMode>
    <Formik
      initialValues={{ emails: [] }}
      onSubmit={(values) => {
        console.log("submit values: ", values);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <ChipInput
            name="emails"
            // regex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i}
            errorMessage="Wrong Email"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
    {/* <Example /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
