import OpcaoTermo from "../models/OpcaoTermo";
import { CreateOpcaoTermoRequestBody } from "../models/interfaces/opcaoTermo";

class OpcaoTermoService{

    public async createOpcaoTermo(opcaoTermo: CreateOpcaoTermoRequestBody) {
        try {
            const createOpcaoTermo = await OpcaoTermo.create(opcaoTermo);
            return createOpcaoTermo;
        } catch (error) {
            throw error
        }
    }
}

export default new OpcaoTermoService()