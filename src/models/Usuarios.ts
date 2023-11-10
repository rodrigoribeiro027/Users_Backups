import mongoose from 'mongoose';

const { Schema } = mongoose;

const usuarios = new Schema({
    nome:String,
    email:String,
    telefone:String,
    endereco:String,
    dataNascimento:Date,
    TermosUso:Boolean,
    dataCadastro:String
})

const Usuarios = mongoose.model("usuarios", usuarios);

export { Usuarios };