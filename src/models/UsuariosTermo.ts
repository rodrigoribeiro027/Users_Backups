import mongoose from "mongoose";
import Termo from "./Termo";


const usuarioTermo = new mongoose.Schema({
    termo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Termo
    },
    aceite: Boolean,
    dataRegistro:{
        type: Date,
        default: new Date()
    }
});

export default usuarioTermo;