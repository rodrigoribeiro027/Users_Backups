import { Router } from "express";
import UsuarioRouter from "./UsuarioRouter"
import LogRouter from "./LogRouter";
import RegistrosDelete from "./RegistersDeleteRouter"
import LoginController from "../controllers/LoginController";
import TermoRouter from "./termoRouter";
import OpcaoTermoRouter from "./opcaoTermoRouter";
import TransacoesRouter from "./TransacoesRouter";
const routes = Router();

routes.get('/', (req, res) => res.json('Is Rodando......'));

routes.use('/log', LogRouter);

routes.post('/login', LoginController.login);
routes.use('/usuario', UsuarioRouter );
routes.use('/registros', RegistrosDelete);
routes.use('/termo', TermoRouter);
routes.use('/opcao', OpcaoTermoRouter);
routes.use('/transacao', TransacoesRouter);
routes.use('/log', LogRouter);


export default routes;