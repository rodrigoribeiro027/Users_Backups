import { Request, Response } from 'express';
import { UsuariosDeleteService } from '../services';


class RegistersDelete{
    public async removeBackupsRegister(req: Request, res: Response){
        try{
            const registers = await UsuariosDeleteService.removerDeleteUserFromMainCollection();
            return res.json("registros removidos");
        }catch(error){
            return res.json(error)
        }
    }
}



export default new RegistersDelete;