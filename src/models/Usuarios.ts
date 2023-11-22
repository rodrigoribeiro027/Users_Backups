import mongoose from 'mongoose';
import { UserType } from '../utils/enum';


const { Schema } = mongoose;

const usuarios = new Schema({
    nome:String,
    email:String,
    senha: String,
    telefone:String,
    endereco:String,
    dataNascimento:Date,
    TermosUso:Boolean,
    dataCadastro:String,
    type: Number
})

const Usuarios = mongoose.model("usuarios", usuarios);

export { Usuarios };