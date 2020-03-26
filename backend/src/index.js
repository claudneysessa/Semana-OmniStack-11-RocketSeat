
/* Importando o Express */

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

/* Criando a Aplicação */

const app = express();

/* Indico para o Express que utilizo Json para interpretar requisições */

app.use(cors());
app.use(express.json());

/* Instanciando as Rotas */

app.use(routes);

/* Configurando a porta de saída do server */

app.listen(9898);