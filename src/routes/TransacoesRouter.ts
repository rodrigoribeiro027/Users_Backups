import { Router } from "express";
import { authenticate, verifyAdmAndFuncionario, verifyTermoVersion } from "../middleware/authenticate";
import  TransacoesController  from "../controllers/TransacoesController";

const routes = Router();

routes.get("/buscar", authenticate, TransacoesController.buscarTransacoesPorUsuario);
routes.post("/criar", authenticate, TransacoesController.createTransacao);

export default routes;