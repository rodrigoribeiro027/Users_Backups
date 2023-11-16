import { Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';
import UsuariosDeleteService from '../services/RegistrosDeleteService';


class UsuarioController {

    public async createUsuario(req: Request, res: Response) {
        try {
            const novoUsuario = req.body;
            const usuario = await UsuarioService.createUsuario(novoUsuario);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async findAllUsuarios(req: Request, res: Response) {
        try {
            const usuario = await UsuarioService.findAllUsuarios();
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateUsuario(req: Request, res: Response) {
        try {
            const usuarioId = req.params.id;
            const usuarioData = req.body;
            const updatedProduto = await UsuarioService.updateUsuario(usuarioId, usuarioData);
            res.status(200).json(updatedProduto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        try {
            const usuarioId = req.params.id;
            const deletedUsuario = await UsuarioService.deleteUsuario(usuarioId);
            if(!deletedUsuario){
                throw `Não encontrado ${usuarioId}.`
            }
            await UsuariosDeleteService.insertDeleteRegister(usuarioId);
            res.status(200).json(deletedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


export default new UsuarioController();