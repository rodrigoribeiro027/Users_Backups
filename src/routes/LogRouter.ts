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

routes.get('/buscarPorUserId', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: 'Parâmetro userId é obrigatório.' });
        }
        const resultadoBusca = await LogController.searchByUserId(userId as string);
        if (resultadoBusca) {
            res.status(200).json({ resultado: resultadoBusca });
        } else {
            res.status(404).json({ message: 'Nenhum registro encontrado para o UserID especificado.' });
        }
    } catch (error) {
        console.error('Erro durante a busca de logs por UserID:', error);
        res.status(500).json({ error: 'Erro durante a busca de logs por UserID.' });
    }
});

routes.get('/buscaUserDate', async (req, res) => {
    try {
        const { dateTime, userId } = req.query;
        if (!dateTime && !userId) {
            return res.status(400).json({ error: 'Parâmetro dateTime ou userId é obrigatório.' });
        }
        const resultadoBusca = await LogController.searchLogs({ dateTime: dateTime as string, userId: userId as string });
        if (resultadoBusca) {
            res.status(200).json({ resultado: resultadoBusca });
        } else {
            res.status(404).json({ message: 'Nenhum registro encontrado para a data, hora ou UserID especificados.' });
        }
    } catch (error) {
        console.error('Erro durante a busca de logs:', error);
        res.status(500).json({ error: 'Erro durante a busca de logs.' });
    }
});

export default routes;
