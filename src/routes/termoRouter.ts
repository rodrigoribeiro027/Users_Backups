import { Router } from "express";
import TermoService from "../services/TermoService";
import TermoController from "../controllers/TermoController";

const routes = Router();

routes.post("/criar", TermoController.createTermo);


export default routes;
