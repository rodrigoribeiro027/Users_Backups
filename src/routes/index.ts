import { Router } from "express";
import ProdutoRouter from "./ProdutoRouter"
import UsuarioRouter from "./UsuarioRouter"
import RegistrosDelete from "./RegistersDeleteRouter"

const routes = Router();

routes.get('/', (req, res) => res.json('Is Rodando......') );

routes.use('/produto', ProdutoRouter );
routes.use('/usuario', UsuarioRouter );
routes.use('/registros', RegistrosDelete)

export default routes;