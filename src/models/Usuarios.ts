import mongoose from 'mongoose';
import Termo from "./Termo";


const { Schema } = mongoose;

const usuarios = new Schema({
    nome:String,
    email:String,
    senha: String,
    telefone:String,
    endereco:String,
    dataNascimento:Date,
    TermosUso:Termo,
    dataCadastro:String,
    type: Number,
})

const Usuarios = mongoose.model("usuarios", usuarios);

export { Usuarios };