import { ProdutoCotroller } from "../controllers";
import { Router } from "express";
import { authenticate, verifyAdmAndFuncionario, verifyTermoVersion } from "../middleware/authenticate";

const routes = Router();

routes.post("/criar", authenticate,ProdutoCotroller.createProduto);
routes.get("/buscar", authenticate, ProdutoCotroller.findAllProdutos);
routes.put("/atualizar/:id", authenticate, ProdutoCotroller.updateProduto);
routes.delete("/excluir/:id", authenticate, ProdutoCotroller.deleteProduct);  

export default routes;
