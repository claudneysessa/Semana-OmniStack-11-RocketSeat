import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";

const app = express();
app.set("port", process.env.PORT || 3333);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(app.get("port"), () => {
	console.log(`PORTA: ${app.get("port")}`);
});
