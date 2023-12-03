import { Router } from "express";
import { authenticate, verifyAdmAndFuncionario, verifyTermoVersion } from "../middleware/authenticate";
import  TransacoesController  from "../controllers/TransacoesController";

const routes = Router();

routes.get("/buscar", authenticate, TransacoesController.buscarTransacoesPorUsuario);

export default routes;