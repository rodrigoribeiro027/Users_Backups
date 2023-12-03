import { Request, Response } from "express";
import TransacaoService from "../services/TransacaoService";

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
}

export default new TransacoesController()