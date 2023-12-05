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
                descricao: tipo,
                data_estimada: data,
            });
            const response = await transacao.save();
            usuario.transacao.push(response);
            await usuario.save();
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default new TransacaoService ()