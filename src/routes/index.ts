import { Router } from "express";
import ProdutoRouter from "./ProdutoRouter"
import UsuarioRouter from "./UsuarioRouter"
import LogRouter from "./LogRouter";
import RegistrosDelete from "./RegistersDeleteRouter"
import LoginController from "../controllers/LoginController";

const routes = Router();

routes.get('/', (req, res) => res.json('Is Rodando......'));

routes.use('/produto', ProdutoRouter);
routes.use('/usuario', UsuarioRouter);
routes.use('/log', LogRouter);

routes.post('/login', LoginController.login);
routes.use('/produto', ProdutoRouter );
routes.use('/usuario', UsuarioRouter );
routes.use('/registros', RegistrosDelete)

export default routes;