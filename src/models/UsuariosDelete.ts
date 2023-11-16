import mongoose from 'mongoose';

const { Schema } = mongoose;

const usuariosDelete = new Schema({ 
    idDelete:String,
    dataEntrada:Date
})

const UsuariosDelete = mongoose.model("usuariosDelete", usuariosDelete);

export { UsuariosDelete };