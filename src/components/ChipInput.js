// Render Prop
import React from "react";
import { useState } from "react";
import CustomTag from "./chipInput/tag";
import "./chipInput.scss";
import { Field } from "formik";
import { Tooltip } from "antd";

const ChipInput = (props) => {
  const { name } = props;
  // const [isDelete, setIsDelete] = useState(false);
  const [email, setEmail] = useState();

  const [enter, setEnter] = useState(false);

  const validate = (value) => {
    let errorMessage;
    const reg = new RegExp(props.regex);

    if (!reg.test(value)) {
      errorMessage = props.errorMessage;
    }
    return errorMessage;
  };

  return (
    <Field name={name}>
      {({ field: { value = [] }, form: { setFieldValue } }) => {
        const deleteEmail = (id) => {
          value.splice(id, 1);
          setFieldValue(name, value);
          console.log("test", value);
        };

        return (
          <section className="email-container">
            {value.map((email, index) => {
              return (
                <CustomTag
                  key={email.id}
                  email={email}
                  deleteEmail={deleteEmail}
                  index={index}
                />
              );
            })}
            <Tooltip visible={enter} placement="bottom" title={validate(email)}>
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
                  setEnter(false);
                  if (
                    e.key === "Backspace" &&
                    email.length === 0 &&
                    value.length > 0
                  ) {
                    value.pop();
                    setFieldValue(name, value);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (validate(email)) {
                      setEnter(true);
                      return;
                    }
                    if (email.length > 0) {
                      value.push(email);
                      setFieldValue(name, value);
                    }
                    setEmail("");
                  }
                }}
              />
            </Tooltip>
          </section>
        );
      }}
    </Field>
  );
};

export default React.memo(ChipInput);
