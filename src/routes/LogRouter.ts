import { LogController } from "../controllers";
import { Router } from "express";

const routes = Router();

routes.get('/busca', async (req, res) => {
    try {
        const { dateTime } = req.query;
        if (!dateTime) {
            return res.status(400).json({ error: 'Parâmetro dateTime é obrigatório.' });
        }

        const resultadoBusca = await LogController.searchByDateTime(dateTime as string);
        if (resultadoBusca) {
            res.status(200).json({ resultado: resultadoBusca });
        } else {
            res.status(404).json({ message: 'Nenhum registro encontrado para a data e hora especificadas.' });
        }
    } catch (error) {
        console.error('Erro durante a busca de logs:', error);
        res.status(500).json({ error: 'Erro durante a busca de logs.' });
    }
});

export default routes;
