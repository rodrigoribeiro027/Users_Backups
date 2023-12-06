import { Request, Response } from 'express';
import { CreateOpcaoTermoRequestBody } from "../models/interfaces/opcaoTermo";
import OpcaoTermoService from "../services/OpcaoTermoService";
import LogController from './LogController';

class OpcaoTermoController{

    public async createOpcaoTermo(req: Request, res: Response) {
        try {
            const body: CreateOpcaoTermoRequestBody = req.body;
            const opcaoTermo = await OpcaoTermoService.createOpcaoTermo(body);
            const logText = `Tipo de serviço: Criação de Opção de Termo, Opção de Termo: ${JSON.stringify(opcaoTermo)}`;
            await LogController.writeToTxt(logText);
            return res.status(201).json(opcaoTermo);
        } catch (error) {
            const logText = ` Tipo de serviço: Criação de Opção de Termo, Erro: ${JSON.stringify(error)}`;
            await LogController.writeToTxt(logText);
            return res.status(500).json({ error: error.message });
        }
    }

    public async findOpcaoTermoById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const opcaoTermo = await OpcaoTermoService.findOpcaoTermoById(id);
            const logText = `Tipo de serviço: Busca de Opção de Termo, Opção de Termo: ${JSON.stringify(opcaoTermo)}`;
            await LogController.writeToTxt(logText);
            return res.status(200).json(opcaoTermo);
        } catch (error) {
            const logText = `Tipo de serviço: Busca de Opção de Termo, Erro: ${JSON.stringify(error)}`;
            await LogController.writeToTxt(logText);
            return res.status(500).json({ error: error.message });
        }
    }
}


export default new OpcaoTermoController();