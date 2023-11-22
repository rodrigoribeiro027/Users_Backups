import { Router } from "express";
import { RegistersDeleteController } from "../controllers";
import { authenticate, verifyAdm } from "../middleware/authenticate";

const routes = Router();


routes.delete("/excluir", authenticate, verifyAdm, RegistersDeleteController.removeBackupsRegister)

export default routes;