import { Usuarios } from "../models/Usuarios";
import { RegistrosDelete} from "../models/RegistrosDelete";


class RegistrosDeleteService{
    public async insertDeleteRegister(usuario){
        try{
            let registro = {
                dataEntrada: new Date(),
                idDelete: usuario._id,
                historicoTermo: [],
                historicoSubtermo: [],
            }
            registro.historicoTermo = usuario.TermosUso;
            registro.historicoSubtermo = usuario.termoOpcoes;
            const register = await RegistrosDelete.create(registro);
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
            console.log(registers);
        }catch(error){
            console.log(error);
        }
    }
}




export default new RegistrosDeleteService();