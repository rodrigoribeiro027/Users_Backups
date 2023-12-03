import { Router } from "express";
import OpcaoTermoController from "../controllers/OpcaoTermoController";

const routes = Router();

routes.post("/criar", OpcaoTermoController.createOpcaoTermo);


export default routes;
