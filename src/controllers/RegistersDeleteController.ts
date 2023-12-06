import { Request, Response } from 'express';
import { RegistrosDeleteService } from '../services';
import LogController from './LogController';


class RegistersDelete{
    public async removeBackupsRegister(req: Request, res: Response){
        try{
            const registers = await RegistrosDeleteService.removerDeleteUserFromMainCollection();
            const logText = ` Tipo de serviço: Deletar de Registro: ${JSON.stringify(registers)}`;
            await LogController.writeToTxt(logText);
            return res.json("registros removidos");
        }catch(error){
            const logText = `Tipo de serviço: Deletar de Registro, Erro: ${JSON.stringify(error)}`;
            await LogController.writeToTxt(logText);
            return res.json(error)
        }
    }
}



export default new RegistersDelete;