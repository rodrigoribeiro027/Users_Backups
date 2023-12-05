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

    public async createTransacao(valor, tipo, data, usuario) {
        try {
            const transacao = new Transacao({
                valor: valor,
                tipo: tipo,
                data: data,
            });
            usuario.transacoes.push(transacao);
            await usuario.save();
            return usuario;
        } catch (error) {
            throw error;
        }
    }
}

export default new TransacaoService ()