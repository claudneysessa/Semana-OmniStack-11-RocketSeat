
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaPowerOff, FaEdit, FaTrashAlt } from "react-icons/fa";

import "./styles.css";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";

export default () => {
  const [incidents, setincidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  function handleLogout() {
    
    localStorage.clear();
    
    history.push("/");

  }

  async function handleDeleteIncident(id) {

    try {

      await api.delete(`incidents/${id}`, {
        headers: {
          ong_id: ongId
        }
      });

      setincidents(incidents.filter(incident => incident.id !== id));
      alert("Deletado com sucesso!");

    } catch (error) {
      alert("Erro ao deletar!");
    }

  }

  useEffect(() => {

    async function loadData() {

      const response = await api.get("profile", {
        headers: {
          ong_id: ongId
        }
      });

      setincidents(response.data);
      
    }

    loadData();

  }, [ongId]);

  return (
    <div className="profile-container">
      <header>
        <img src={Logo} alt="main-logo" />
        <span>Bem Vindo, {ongName}</span>
        <Link className="button" to="incidents/new">
          Cadastrar novo Caso
        </Link>
        <button onClick={handleLogout}>
          <FaPowerOff size={18} color="#E02041" />
        </button>
      </header>
      <h1>incidents cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <div>
              <button tyoe="button">
                <FaEdit size={20} color="#a8a8b3" />
              </button>
              <button
                onClick={() => handleDeleteIncident(incident.id)}
                tyoe="button"
              >
                <FaTrashAlt size={20} color="#a8a8b3" />
              </button>
            </div>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );

};
