import { Request, Response } from "express";
import TransacaoService from "../services/TransacaoService";
import { UsuarioService } from "../services";
import LogController from './LogController';

class TransacoesController {
    public async buscarTransacoesPorUsuario(req: Request, res: Response) {
        try {
            console.log(res.locals.jwtPayload)
            const userId = res.locals.jwtPayload._id;
            const transacoes = await TransacaoService.buscarTransacoesPorUsuario(userId);
            const logText = `Tipo de açâo: Busca de Transacoes do Usuario, Usuario foi Criado id: ${JSON.stringify(userId._id)}`;
            await LogController.writeToTxt(logText);
            res.status(200).json(transacoes);
        } catch (error) {
            res.status(500).json({ message: error.message });
            const logText = ` Tipo de serviço: Busca de Transacoes do Usuario, Erro: ${JSON.stringify(error)}`;
            await LogController.writeToTxt(logText);
        }
    }
    public async createTransacao(req: Request, res: Response) {
        try {
            const userId = res.locals.jwtPayload._id;
            const usuario = await UsuarioService.findUsuarioById(userId);
            const { valor, tipo, data } = req.body;          
            const response = await TransacaoService.createTransacao(valor, tipo, data, usuario);
            const logText = `Tipo de açâo: ${tipo} feito(a) pelo Usuario do id: ${JSON.stringify(userId)}`;
            await LogController.writeToTxt(logText);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error)
            const logText = ` Tipo de serviço: Criação de Transacao, Erro: ${JSON.stringify(error)}`;
            await LogController.writeToTxt(logText);
            res.status(500).json(error);
        }
    }
    
}

export default new TransacoesController()