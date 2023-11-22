import { ProdutoCotroller } from "../controllers";
import { Router } from "express";
import { authenticate, verifyAdmAndFuncionario } from "../middleware/authenticate";

const routes = Router();

routes.post("/criar", authenticate, verifyAdmAndFuncionario,ProdutoCotroller.createProduto);
routes.get("/buscar", ProdutoCotroller.findAllProdutos);
routes.put("/atualizar/:id", authenticate, verifyAdmAndFuncionario, ProdutoCotroller.updateProduto);
routes.delete("/excluir/:id", authenticate, verifyAdmAndFuncionario, ProdutoCotroller.deleteProduct);  

export default routes;
