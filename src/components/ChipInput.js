// Render Prop
import React, { useState } from "react";
import CustomTag from "./chipInput/tag";
import { Field } from "formik";
import { Tooltip } from "antd";
import "./chipInput.scss";

const ChipInput = ({ name, errorMessage, regex }) => {
  const [{ email, enter, curserRemove }, setState] = useState({
    email: "",
    enter: false,
    curserRemove: false,
  });

  const validate = (value) => {
    const reg = new RegExp(regex);

    if (!reg.test(value)) {
      return errorMessage;
    }
  };

  return (
    <Field name={name}>
      {({ field: { value = [] }, form: { setFieldValue } }) => {
        const deleteEmail = (id) => {
          value.splice(id, 1);
          setFieldValue(name, value);
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
            <Tooltip
              visible={enter}
              placement="bottom"
              title={curserRemove ? "Please Press Enter" : validate(email)}
            >
              <input
                placeholder="Enter more emails"
                className="input"
                name={name}
                value={email}
                onBlur={(e) => {
                  if (email) {
                    setState((st) => ({
                      ...st,
                      enter: true,
                      curserRemove: true,
                    }));
                  }
                }}
                onChange={(event) => {
                  setState((st) => ({
                    ...st,
                    email: event.target.value,
                  }));
                }}
                onKeyDown={(e) => {
                  setState((st) => ({
                    ...st,
                    enter: false,
                    curserRemove: false,
                  }));
                  if (e.key === "Backspace" && !email && value) {
                    value.pop();
                    setFieldValue(name, value);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (validate(email)) {
                      setState((st) => ({
                        ...st,
                        enter: true,
                      }));
                      return;
                    }
                    if (email) {
                      value.push(email);
                      setFieldValue(name, value);
                    }
                    setState((st) => ({
                      ...st,
                      email: "",
                    }));
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
