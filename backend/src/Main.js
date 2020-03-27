
import "dotenv/config";

import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();

// app.set("port", process.env.PORT || 3333);

app.set("port", 9999);

app.use(cors(

));

app.use(express.json());
app.use(routes);

app.listen(app.get("port"), () => {
	console.log('API iniciada com sucesso!\n');
	console.log('Dados de Conexão');
	console.log(`Porta: ${app.get("port")}`);
});
