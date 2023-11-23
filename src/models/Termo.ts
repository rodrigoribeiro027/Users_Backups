import mongoose from 'mongoose';



const termo = new mongoose.Schema({
    versao:String,
    aceito:Boolean
})


export default termo;