import mongoose from 'mongoose';

const { Schema } = mongoose;

const produtos = new Schema({ 
    nome:String,
    descricao:String,
    preco:Number,
    quantidade:Number
})

const Produtos = mongoose.model("produtos", produtos);

export { Produtos };