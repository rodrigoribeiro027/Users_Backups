import { Router } from "express";
import { UsuarioController } from "../controllers";
import { authenticate, verifyAdmAndFuncionario } from "../middleware/authenticate";

const routes = Router();

routes.post("/criar", UsuarioController.createUsuario);
routes.get("/buscar", authenticate, verifyAdmAndFuncionario,UsuarioController.findAllUsuarios);
routes.put("/atualizar/:id", authenticate, verifyAdmAndFuncionario, UsuarioController.updateUsuario);
routes.delete("/excluir/:id", authenticate, verifyAdmAndFuncionario, UsuarioController.deleteProduct);  

export default routes;
