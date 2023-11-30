import { Request, Response } from 'express';
import Termo from '../models/Opcao';
import TermoService from '../services/TermoService';


class TermoController{
    public async createTermo(req: Request, res: Response){
        try{
            const { termo, versao } = req.body;
            const ret = await Termo.create({termo:termo, versao: versao})
            res.status(201).json(ret);
        }catch(error){
            return res.status(500).json(error);
        }
    }

    public async findAllTermo(req: Request, res: Response){
        try{
            const ret = await Termo.find();
            res.status(201).json(ret);
        }catch(error){
            return res.status(500).json(error);
        }
    }

    public async findByIdTermo(req: Request, res: Response){
        try{
            const {id} = req.params
            const ret = await TermoService.findByID(id);
            res.status(201).json(ret);
        }catch(error){
            return res.status(500).json(error);
        }
    }
}


export default new TermoController();