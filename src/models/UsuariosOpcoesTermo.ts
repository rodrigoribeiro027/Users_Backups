import mongoose from "mongoose";
import OpcaoTermo from "./OpcaoTermo";


const usuariosOpcoesTermo = new mongoose.Schema({
    opcaoTermo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: OpcaoTermo
    },
    aceite: Boolean,
    dataRegistro:{
        type: Date,
        default: new Date()
    }
});

export default usuariosOpcoesTermo;