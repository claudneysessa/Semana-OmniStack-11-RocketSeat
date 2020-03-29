
/* Importando o axios */

import axios from "axios";

/* Definindo a URL padrão de chamada */

const api = axios.create({
  baseURL: "http://localhost:9999"
});

/* Exportando a API para a aplicação */

export default api;