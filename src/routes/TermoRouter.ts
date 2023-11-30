import { Router } from "express";
import TermoController from "../controllers/OpcaoController";

const routes = Router();

routes.post("/criar", TermoController.createTermo);
routes.get("/buscar", TermoController.findAllTermo);
routes.get("/buscar/:id", TermoController.findByIdTermo); 

export default routes;
