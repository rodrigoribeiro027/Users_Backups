import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import usuarioTermo from './UsuariosTermo';
import usuariosOpcoesTermo from './UsuariosOpcoesTermo';


dotenv.config()

const URI = process.env.URI || '';

const { Schema } = mongoose;

const usuariosDelete = new Schema({ 
    idDelete:String,
    dataEntrada:Date,
    historicoTermo:[usuarioTermo],
    historicoSubtermo:[usuariosOpcoesTermo],
    motivo: String
})
let conectionDeleteRegisters;
let RegistrosDelete;

const secondConn =async() => {
    try{
        conectionDeleteRegisters = await mongoose.createConnection(URI + "/RegistersDelete");
        RegistrosDelete = conectionDeleteRegisters.model("registers", usuariosDelete);
    }catch(error){
        console.log(error);
    }
}
secondConn()



export { RegistrosDelete };