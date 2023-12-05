import { Request, Response } from 'express';
import { CreateOpcaoTermoRequestBody } from "../models/interfaces/opcaoTermo";
import OpcaoTermoService from "../services/OpcaoTermoService";

class OpcaoTermoController{

    public async createOpcaoTermo(req: Request, res: Response) {
        try {
            const body: CreateOpcaoTermoRequestBody = req.body;
            const opcaoTermo = await OpcaoTermoService.createOpcaoTermo(body);
            return res.status(201).json(opcaoTermo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async findOpcaoTermoById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const opcaoTermo = await OpcaoTermoService.findOpcaoTermoById(id);
            return res.status(200).json(opcaoTermo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}


export default new OpcaoTermoController();