import { Router } from "express";
import { UsuarioController } from "../controllers";

const routes = Router();

routes.post("/criar", UsuarioController.createUsuario);
routes.get("/buscar", UsuarioController.findAllUsuarios);
routes.put("/atualizar/:id", UsuarioController.updateUsuario);
routes.delete("/excluir/:id", UsuarioController.deleteProduct);  

export default routes;
