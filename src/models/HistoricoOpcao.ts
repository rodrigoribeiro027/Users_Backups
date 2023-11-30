import mongoose from "mongoose";
import { Usuarios } from "./Usuarios";
import Termo from "./Opcao";

const historico = new mongoose.Schema({
    data_registro: {
        type: Date,
        default: new Date()
    },
    ususario_id:{
        type: mongoose.Types.ObjectId,
        ref: Usuarios
    },
    termo_id:{
        type: mongoose.Types.ObjectId,
        ref: Termo
    },
    valor_antigo: Boolean,
    valor_novo: Boolean
})

const Historico = mongoose.model("historico", historico);

export default Historico;