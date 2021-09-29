// Render Prop
import React from "react";
import { useState } from "react";
import Tag from "./chipInput/tag";
import "./chipInput.scss";

const Basic = () => {
  const [emails, setEmails] = useState([]);

  const [email, setEmail] = useState();

  // const emailUpdate = (e) => {
  //   // setEmails(e)
  //   console.log(e.target.value);
  //   setEmail(e.target.value);
  // };

  const addEmail = (e) => {
    if (email.length > 0) {
      const id = new Date().toISOString();
      const name = email;
      const newEmail = { id, name };
      setEmails((prvEmails) => {
        return prvEmails.concat(newEmail);
      });
    }
  };

  const deleteEmail = (id) => {
    setEmails((prvEmails) => {
      return prvEmails.filter((todo) => todo.id !== id);
    });
  };

  return (
    <section className="email-container">
      {emails.map((email) => {
        return <Tag email={email} deleteEmail={deleteEmail} />;
      })}
      <input
        className="input"
        name="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        onKeyPress={(e) => {
          // console.log(e);
          if (e.key === "Enter") {
            addEmail();
            setEmail("");
          }
        }}
      />
    </section>
  );
};

export default Basic;
