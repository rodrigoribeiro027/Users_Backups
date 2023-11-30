import mongoose from "mongoose";
import Termo from "./Opcao";

const termoUsuario = new mongoose.Schema({
    termo_id: {
        type: mongoose.Types.ObjectId,
        ref: Termo
    },
    aceito:Boolean,
    data_de_aceito: String,
    data_atualizacao: String
})


export default termoUsuario;

