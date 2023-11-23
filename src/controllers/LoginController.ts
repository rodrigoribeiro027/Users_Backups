import { Request, Response } from 'express';
import { Usuarios } from '../models/Usuarios';
import { generateToken } from '../middleware/authenticate';
import LogController from './LogController';


class LoginController{
    public async login(req: Request, res: Response){
        try{
            const { email, senha } = req.body;
            const usuario = await Usuarios.findOne({email: email, senha:senha}, "-__v");
            if(!usuario){
                return res.status(404).json(`usuario não encontrado, email ou senha incorreto....`);
            }
            const token = await generateToken(usuario);
            const logText = `Login realizado token: ${token}`;
            await LogController.writeToTxt(logText);
            res.set('Authorization', `Bearer ${token}`);
            return res.status(200).json({message:'Login realizado com sucesso...', token:token, termo:usuario.TermosUso});
        }catch(error){
            return res.status(500).json(error);
        }
    }
}


export default new LoginController();