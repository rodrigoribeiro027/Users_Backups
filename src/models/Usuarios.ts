import mongoose from 'mongoose';
import Termo from "./Opcao";
import termoUsuario from './TermoUsuario';


const { Schema } = mongoose;

const usuarios = new Schema({
    nome:String,
    email:String,
    senha: String,
    telefone:String,
    endereco:String,
    dataNascimento:Date,
    TermosUso:[termoUsuario],
    dataCadastro:String,
    type: Number,
})

const Usuarios = mongoose.model("usuarios", usuarios);

export { Usuarios };