// Render Prop
import React from "react";
import { useState } from "react";
import CustomTag from "./chipInput/tag";
import "./chipInput.scss";
import { Field } from "formik";

const ChipInput = (props) => {
  const { name, list } = props;
  const [isDelete, setIsDelete] = useState(false);
  const [email, setEmail] = useState();

  const deleteEmail = (id) => {
    setIsDelete(true);
    list.email.splice(id, 1);
    console.log("test", list);
  };

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => (
        <section className="email-container">
          {isDelete ? setIsDelete(false) : ""}
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (email.length > 0) {
                  value.push(email);
                  setFieldValue("email", value);
                }
                setEmail("");
              }
            }}
          />
        </section>
      )}
    </Field>
  );
};

export default React.memo(ChipInput);
