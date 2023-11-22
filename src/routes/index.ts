import { Router } from "express";
import ProdutoRouter from "./ProdutoRouter"
import UsuarioRouter from "./UsuarioRouter"
import LogRouter from "./LogRouter";

const routes = Router();

routes.get('/', (req, res) => res.json('Is Rodando......'));

routes.use('/produto', ProdutoRouter);
routes.use('/usuario', UsuarioRouter);
routes.use('/log', LogRouter);


export default routes;