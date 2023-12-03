import Termo from "../models/Termo";
import { CreateTermoRequestBody } from "../models/interfaces/termo";

class TermoService{

    public async createTermo(termo: CreateTermoRequestBody){
        try {
            const createTermo = await Termo.create(termo);
            return createTermo;
        } catch (error) {
            throw error
        }
    }

    public async findLastVersion(){
        try {
            const termo = await Termo.findOne();
            console.log(termo);
            return termo;
        } catch (error) {
            throw error
        }
    }
}

export default new TermoService();