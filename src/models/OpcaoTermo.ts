import mongoose from "mongoose";


const opcaoTermo = new mongoose.Schema({
    descricao:String,
    dataCriacao:{
        type: Date,
        default: new Date()
    }
});


const OpcaoTermo = mongoose.model("opcoesTermo", opcaoTermo);  

export default OpcaoTermo;