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
            const termos = await Termo.find();
            const ultimaVersao = termos.reduce((a, b) => a.versao > b.versao ? a : b);
            return ultimaVersao;
        } catch (error) {
            throw error
        }
    }
}

export default new TermoService();