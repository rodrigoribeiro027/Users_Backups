import { Request, Response } from "express";
import TransacaoService from "../services/TransacaoService";
import { UsuarioService } from "../services";

class TransacoesController {
    public async buscarTransacoesPorUsuario(req: Request, res: Response) {
        try {
            console.log(res.locals.jwtPayload)
            const userId = res.locals.jwtPayload._id;

            const transacoes = await TransacaoService.buscarTransacoesPorUsuario(userId);
            res.status(200).json(transacoes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    public async criarTrasacao(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const objetivo = await UsuarioService.getObjetivoById(id);
            const { titulo, descricao, data_estimada, prioridade } = req.body;
            const response = await TarefaService.createTarefa(titulo, descricao, data_estimada, prioridade, objetivo);
            objetivo.total_tarefas++;
            await objetivo.save();
            return res.status(200).json(response);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
}

export default new TransacoesController()