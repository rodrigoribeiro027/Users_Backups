import mongoose from 'mongoose';



const opcao = new mongoose.Schema({
    opcao:String,
    versao: String,
    data_criacao:{
        type: Date,
        default: new Date()
    },
})


const Opcoes = mongoose.model("opcoes", opcao);

export default Opcoes;