// Render Prop
import React, { useState } from "react";
import CustomTag from "./chipInput/tag";
import { useField } from "formik";
import { Tooltip } from "antd";
import "./chipInput.scss";

const ChipInput = ({ name, errorMessage, regex, label, ...props }) => {
  const [, { value }, { setValue }] = useField(name);

  const [{ email, enter, curserRemove }, setState] = useState({
    email: "",
    enter: false,
    curserRemove: false,
  });

  const isInvalid = React.useCallback(
    (value) => {
      const reg = new RegExp(regex);

      if (!reg.test(value)) {
        return errorMessage;
      }
    },
    [errorMessage, regex]
  );

  const deleteEmail = React.useCallback(
    (id) => {
      value.splice(id, 1);
      setValue(value);
    },
    [value, setValue]
  );

  const onBlur = React.useCallback(() => {
    if (email) {
      setState((st) => ({
        ...st,
        enter: true,
        curserRemove: true,
      }));
    }
  }, [email]);

  const onChange = React.useCallback((event) => {
    setState((st) => ({
      ...st,
      email: event.target.value,
    }));
  }, []);

  const onKeyDown = React.useCallback(
    (e) => {
      setState((st) => ({
        ...st,
        enter: false,
        curserRemove: false,
      }));
      if (e.key === "Backspace" && !email && value) {
        value.pop();
        setValue(value);
      }
    },
    [email, setValue, value]
  );

  const onKeyPress = React.useCallback(
    (e) => {
      if (e.key === "Enter") {
        if (isInvalid(email)) {
          setState((st) => ({
            ...st,
            enter: true,
          }));
          return;
        }
        if (email) {
          value.push(email);
          setValue(value);
        }
        setState((st) => ({
          ...st,
          email: "",
        }));
      }
    },
    [email, setValue, isInvalid, value]
  );

  if (!value) {
    return null;
  }

  return (
    <section className="email-container">
      {value.map((email, index) => {
        return (
          <CustomTag
            key={index}
            email={email}
            deleteEmail={deleteEmail}
            index={index}
          />
        );
      })}
      <Tooltip
        visible={enter}
        placement="bottom"
        title={curserRemove ? "Please Press Enter" : isInvalid(email)}
      >
        <input
          placeholder="Enter more emails"
          className="input"
          name={name}
          value={email}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
        />
      </Tooltip>
    </section>
  );
};

export default React.memo(ChipInput);
