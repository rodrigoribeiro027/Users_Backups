import { Router } from "express";
import { UsuarioController, RegistersDeleteController } from "../controllers";

const routes = Router();


routes.delete("/excluir", RegistersDeleteController.removeBackupsRegister)

export default routes;