import { UsuariosDelete} from "../models/UsuariosDelete";


class UsuariosDeleteSercice{
    public async insertDeleteRegister(id: string){
        try{
            const new_register = new UsuariosDelete({dataEntrada: new Date(), idDelete: id})
            const register = await UsuariosDelete.create(new_register)
            return register;
        }catch(error){
            console.log(error)
        }
    }
}



export default new UsuariosDeleteSercice()