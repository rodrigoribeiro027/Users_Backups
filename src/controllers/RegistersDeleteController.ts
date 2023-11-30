import { Request, Response } from 'express';
import { RegistrosDeleteService } from '../services';


class RegistersDelete{
    public async removeBackupsRegister(req: Request, res: Response){
        try{
            const registers = await RegistrosDeleteService.removerDeleteUserFromMainCollection();
            return res.status(200).json("registros removidos");
        }catch(error){
            return res.status(500).json(error)
        }
    }
}



export default new RegistersDelete;