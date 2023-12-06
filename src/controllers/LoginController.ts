import { Request, Response } from 'express';
import { Usuarios } from '../models/Usuarios';
import { generateToken } from '../middleware/authenticate';
import LogController from './LogController';
import TermoService from '../services/TermoService';


class LoginController{
    public async login(req: Request, res: Response){
        try{
            const { email, senha } = req.body;
            const usuario = await Usuarios.findOne({email: email, senha:senha}, "-__v").populate({
                path: 'TermosUso',
                populate: {
                    path: 'termo'
                }
            });
            if(!usuario){
                return res.status(404).json(`usuario não encontrado, email ou senha incorreto....`);
            }
            let termo;
            if(usuario.TermosUso.length > 1){
                termo = usuario.TermosUso.reduce((a, b) => a.dataRegistro > b.dataRegistro ? a : b);
            }else{
                termo = usuario.TermosUso[0];
            }
            const lastTermo = await TermoService.findLastVersion();
            if(termo.termo.versao < lastTermo.versao){
                return res.status(403).json({message:'Os termos de uso foram atualizados, por favor verifique e aceite novamente.'});
            }
            const token = await generateToken(usuario);
            const logText = `Login realizado token do Usuario: ${token}`;
            await LogController.writeToTxt(logText);
            res.set('Authorization', `Bearer ${token}`);
            return res.status(200).json({message:'Login realizado com sucesso...', token:token, termo:usuario.TermosUso});
        }catch(error){
            console.log(error)
            return res.status(500).json(error);
        }
    }
}


export default new LoginController();