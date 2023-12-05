import { Request, Response } from 'express';
import { CreateTermoRequestBody } from "../models/interfaces/termo";
import TermoService from '../services/TermoService';

class TermoController{

    public async createTermo(req: Request, res: Response) {
        try {
            const body: CreateTermoRequestBody = req.body;
            const termo = await TermoService.createTermo(body);
            return res.status(201).json(termo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    public async findLastTermoVersion(req: Request, res: Response) {
        try {
            const termo = await TermoService.findLastVersion();
            return res.status(200).json(termo);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}


export default new TermoController()