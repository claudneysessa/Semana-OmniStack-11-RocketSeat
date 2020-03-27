import React from "react";
import { Route } from "react-router-dom";

export default ({ path, component }) => {
  return (
    <>
      {localStorage.getItem("ongId") ? (
        <Route path={path} component={component} />
      ) : (
        <>
          <h1>VOCÊ NÃO TEM PERMISSÃO!</h1>
        </>
      )}
    </>
  );
};
