import { Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';
import UsuariosDeleteService from '../services/RegistrosDeleteService';
import LogController from './LogController';


class UsuarioController {

    public async createUsuario(req: Request, res: Response) {
        try {
            const { nome, email, senha, telefone, endereco, dataNascimento, termos, type } = req.body;
            const usuario = await UsuarioService.createUsuario(nome, email, senha, telefone, endereco, dataNascimento, termos, type);
            const logText = `Usuario foi Criado id: ${JSON.stringify(usuario)}`;
            await LogController.writeToTxt(logText);
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
            const logText = `Usuario Atualizado id: ${JSON.stringify(updatedProduto)}`;
            await LogController.writeToTxt(logText);
            res.status(200).json(updatedProduto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        try {
            const usuarioId = req.params.id;
            const deletedUsuario = await UsuarioService.deleteUsuario(usuarioId);
            if (!deletedUsuario) {
                throw `Não encontrado ${usuarioId}.`
            }
            await UsuariosDeleteService.insertDeleteRegister(usuarioId);
            const logText = `Usuario deletado: ${JSON.stringify(deletedUsuario)}`;
            await LogController.writeToTxt(logText);
            res.status(200).json(deletedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


export default new UsuarioController();