import mongoose from 'mongoose';
import * as dotenv from "dotenv";


dotenv.config()

const URI = process.env.URI || '';

const { Schema } = mongoose;

const usuariosDelete = new Schema({ 
    idDelete:String,
    dataEntrada:Date
})
let conectionDeleteRegisters;
let UsuariosDelete;

const secondConn =async() => {
    try{
        conectionDeleteRegisters = await mongoose.createConnection(URI + "/RegistersDelete");
        UsuariosDelete = conectionDeleteRegisters.model("registers", usuariosDelete);
    }catch(error){
        console.log(error);
    }
}
secondConn()



export { UsuariosDelete };