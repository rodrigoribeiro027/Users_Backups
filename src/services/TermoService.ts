import Termo from "../models/Opcao";

class TermoService{
    public async findByID(id){
        try{
            const ret = await Termo.findById(id);
            return ret
        }catch(error){
            throw error;
        }
    }
}



export default new TermoService();