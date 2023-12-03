import { Router } from "express";
import { RegistersDeleteController } from "../controllers";
import { authenticate, verifyAdm, verifyTermoVersion } from "../middleware/authenticate";

const routes = Router();


routes.delete("/excluir", authenticate, RegistersDeleteController.removeBackupsRegister)

export default routes;