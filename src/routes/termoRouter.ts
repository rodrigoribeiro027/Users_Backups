import { Router } from "express";
import TermoService from "../services/TermoService";
import TermoController from "../controllers/TermoController";

const routes = Router();

routes.post("/criar", TermoController.createTermo);
routes.get("/buscarUltimaVersao", TermoController.findLastTermoVersion);


export default routes;
