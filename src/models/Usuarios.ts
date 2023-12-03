import mongoose from 'mongoose';
import Termo from "./Termo";
import transacao from './Transacao';
import usuariosOpcoesTermo from './UsuariosOpcoesTermo';
import usuarioTermo from './UsuariosTermo';


const { Schema } = mongoose;

const usuarios = new Schema({
    nome:String,
    email:String,
    senha: String,
    cpf: Number,
    telefone:String,
    endereco:String,
    dataNascimento:Date,
    TermosUso: [usuarioTermo],
    termoOpcoes: [usuariosOpcoesTermo],
    transacoes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: transacao
    }],
    dataCadastro:{
        type: Date,
        default: new Date()
    },
    type: Number,
});

const Usuarios = mongoose.model("usuarios", usuarios);

export { Usuarios };