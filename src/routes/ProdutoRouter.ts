import { ProdutoCotroller } from "../controllers";
import { Router } from "express";

const routes = Router();

routes.post("/criar", ProdutoCotroller.createProduto);
routes.get("/buscar", ProdutoCotroller.findAllProdutos);
routes.put("/atualizar/:id", ProdutoCotroller.updateProduto);
routes.delete("/excluir/:id", ProdutoCotroller.deleteProduct);  

export default routes;
