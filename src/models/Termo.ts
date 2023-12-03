import mongoose from 'mongoose';



const termo = new mongoose.Schema({
    versao:String,
    descricao:String,
    dataCriacao:{
        type: Date,
        default: new Date()
    }
});


const Termo = mongoose.model("termos", termo);

export default Termo;