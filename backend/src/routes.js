import { Router } from "express";
import OngsController from "./controllers/OngsController";
import IncidentsController from "./controllers/IncidentsController";
import DetailsOngsController from "./controllers/DetailsOngsController";
import SessioonController from "./controllers/SessionController";

const routes = Router();

routes.post("/sessions", SessioonController.store);

routes.get("/ongs", OngsController.index);
routes.post("/ongs", OngsController.store);

routes.get("/details", DetailsOngsController.index);

routes.get("/incidents", IncidentsController.index);
routes.post("/incidents", IncidentsController.store);
routes.delete("/incidents/:id", IncidentsController.delete);

export default routes;
