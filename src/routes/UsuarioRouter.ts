import { Router } from "express";
import { UsuarioController } from "../controllers";
import { authenticate, verifyAdmAndFuncionario, verifyTermoVersion } from "../middleware/authenticate";

const routes = Router();

routes.post("/criar", UsuarioController.createUsuario);
routes.get("/buscar", authenticate, verifyTermoVersion, verifyAdmAndFuncionario,UsuarioController.findAllUsuarios);
routes.put("/atualizar/:id", authenticate, verifyTermoVersion, verifyAdmAndFuncionario, UsuarioController.updateUsuario);
routes.delete("/excluir/:id", authenticate, verifyTermoVersion, verifyAdmAndFuncionario, UsuarioController.deleteProduct);

export default routes;
