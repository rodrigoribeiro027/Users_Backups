import mongoose from "mongoose";


const transacao = new mongoose.Schema({
    valor: Number,
    tipo: String,
    data:{
        type: Date,
        default: new Date()
    }
});

export default transacao;