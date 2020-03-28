
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import Heroes from "../../assets/heroes.png";
import Logo from "../../assets/logo.svg";

import "./styles.css";
import api from "../../services/api";

export default () => {

  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(env) {
    
    env.preventDefault();

    try {

      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");

      alert(`Bem vindo ${response.data.name}`);

    } catch (error) {
      alert("Erro no Login, tente novamente!");
    }

  }

  return (
    <div className="login-containner">
      <section className="form">
        <img src={Logo} alt="logo" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={env => setId(env.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FaSignInAlt height={16} color="#E02041" />
            Não tenho Cadastro
          </Link>
        </form>
      </section>
      <img src={Heroes} alt="heroes" />
    </div>
  );

};
