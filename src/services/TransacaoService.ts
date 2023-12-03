import mongoose from "mongoose";
import transacaoSchema from "../models/Transacao";
import { Usuarios } from "../models/Usuarios";

const Transacao = mongoose.model("Transacao", transacaoSchema);

class TransacaoService {

    public async buscarTransacoesPorUsuario(id: string) {
        try {
            const usuario = await Usuarios.findById(id, '-__v');
            return usuario.transacoes;
        } catch (error) {
            throw error;
        }
    }
}

export default new TransacaoService ()