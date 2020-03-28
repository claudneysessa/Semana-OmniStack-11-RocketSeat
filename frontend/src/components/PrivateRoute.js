
import React from "react";
import { Route } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import Heroes from "../assets/heroes.png";
import Logo from "../assets/logo.svg";

import "../global.css";

export default ({ path, component }) => {

  return (
    <>
      {localStorage.getItem("ongId") ? (
        <Route path={path} component={component} />
      ) : (
        <div className="erro-containner">
          <center>
          <img src={Logo} alt="logo" />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Desculpe mais você ainda não possui acesso!</h1>
          <br></br>
          <br></br>
          <br></br>
          <img src={Heroes} alt="heroes" />
          </center>
        </div>
      )}
    </>
  );
  
};
