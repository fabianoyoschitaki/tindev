// React is 1. Component, 2. State and 3. Properties
import React, { useState } from "react";
import "./Login.css";

import api from "../services/api";

import logo from "../assets/logo.svg";

export default function Login({ history }) {
  const [username, setUsername] = useState("");

  // we'll need to do await inside the method
  async function handleSubmit(e) {
    //avoid redirecting
    e.preventDefault();

    // username should be used to call API, get _id. Install axios
    console.log(username);

    const response = await api.post("/devs", {
      // username: username, short syntax from es6
      username
    });

    // get current user id and send to next page
    const { _id } = response.data;

    // sending to main
    history.push(`/dev/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
