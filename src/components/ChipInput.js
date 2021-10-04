// Render Prop
import React from "react";
import { useState } from "react";
import CustomTag from "./chipInput/tag";
import "./chipInput.scss";
import { ErrorMessage, Field } from "formik";

const ChipInput = (props) => {
  const { name } = props;
  // const [isDelete, setIsDelete] = useState(false);
  const [email, setEmail] = useState();

  const validate = (value) => {
    console.log("calling");
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = "Invalid email address";
    }
    return errorMessage;
  };

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        const deleteEmail = (id) => {
          value.splice(id, 1);
          setFieldValue("email", value);
          console.log("test", value);
        };

        return (
          <section className="email-container">
            {/* {isDelete ? setIsDelete(false) : ""} */}
            {value.map((email, index) => {
              return (
                <CustomTag
                  key={email.id}
                  email={email}
                  deleteEmail={deleteEmail}
                  index={index}
                  // list={value}
                />
              );
            })}
            <input
              placeholder="Enter more emails"
              className="input"
              {...props}
              name={name}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              onKeyDown={(e) => {
                if (
                  e.key === "Backspace" &&
                  email.length === 0 &&
                  value.length > 0
                ) {
                  value.pop();
                  setFieldValue("email", value);
                }
                // console.log("e ", e.key);
              }}
              onKeyPress={(e) => {
                // console.log("e.key: ", e);
                if (e.key === "Enter") {
                  if (validate(email)) {
                    const errorMessage = validate(email);
                    console.log("errorMessage: ", errorMessage);
                    <ErrorMessage name="email">{errorMessage}</ErrorMessage>;
                    return;
                  }
                  if (email.length > 0) {
                    value.push(email);
                    setFieldValue("email", value);
                  }
                  setEmail("");
                }
              }}
            />
          </section>
        );
      }}
    </Field>
  );
};

export default React.memo(ChipInput);
