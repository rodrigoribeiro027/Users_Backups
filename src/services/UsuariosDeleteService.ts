import { Usuarios } from "../models/Usuarios";
import { UsuariosDelete} from "../models/UsuariosDelete";


class UsuariosDeleteSercice{
    public async insertDeleteRegister(id: string){
        try{
            const new_register = new UsuariosDelete({dataEntrada: new Date(), idDelete: id});
            const register = await UsuariosDelete.create(new_register);
            return register;
        }catch(error){
            console.log(error);
        }
    }

    public async findAllDeleteRegisters(){
        try{
            const registers = await UsuariosDelete.find();
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
            console.log(registers);
        }catch(error){
            console.log(error);
        }
    }
}




export default new UsuariosDeleteSercice();