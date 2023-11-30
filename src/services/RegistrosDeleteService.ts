import { Usuarios } from "../models/Usuarios";
import { RegistrosDelete} from "../models/RegistrosDelete";


class RegistrosDeleteService{
    public async insertDeleteRegister(id: string){
        try{
            const new_register = new RegistrosDelete({dataEntrada: new Date(), idDelete: id});
            const register = await RegistrosDelete.create(new_register);
            return register;
        }catch(error){
            console.log(error);
        }
    }

    public async findAllDeleteRegisters(){
        try{
            const registers = await RegistrosDelete.find();
            return registers;
        }catch(error){
            console.log(error);
        }
    }

    public async removerDeleteUserFromMainCollection(){
        try{
            const registers = await this.findAllDeleteRegisters();
            for (let index = 0; index < registers.length; index++) {
                const element = registers[index];
                await Usuarios.findByIdAndDelete(element.idDelete);
            }
            return ""
        }catch(error){
            throw error;
        }
    }
}




export default new RegistrosDeleteService();