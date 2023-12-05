import { Router } from "express";
import { UsuarioController } from "../controllers";
import { authenticate } from "../middleware/authenticate";

const routes = Router();

routes.post("/criar", UsuarioController.createUsuario);
routes.get("/buscar", authenticate, UsuarioController.findAllUsuarios);
routes.put("/atualizar/:id", authenticate, UsuarioController.updateUsuario);
routes.delete("/excluir/:id", authenticate, UsuarioController.deleteUser);

routes.put("/OpcaoTermo", authenticate, UsuarioController.alterarOuAdicionarNovaOpcaoTermoUsuario);

export default routes;