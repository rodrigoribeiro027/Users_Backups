import { ProdutoCotroller } from "../controllers";
import { Router } from "express";
import { authenticate, verifyAdmAndFuncionario, verifyTermoVersion } from "../middleware/authenticate";

const routes = Router();

routes.post("/criar", authenticate, verifyTermoVersion, verifyAdmAndFuncionario,ProdutoCotroller.createProduto);
routes.get("/buscar", authenticate, verifyTermoVersion, ProdutoCotroller.findAllProdutos);
routes.put("/atualizar/:id", authenticate, verifyTermoVersion, verifyAdmAndFuncionario, ProdutoCotroller.updateProduto);
routes.delete("/excluir/:id", authenticate, verifyTermoVersion, verifyAdmAndFuncionario, ProdutoCotroller.deleteProduct);  

export default routes;
