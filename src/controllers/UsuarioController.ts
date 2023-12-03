import { Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';
import UsuariosDeleteService from '../services/RegistrosDeleteService';
import LogController from './LogController';
import { CreateUsuarioRequestBody } from '../models/interfaces/usuario';


class UsuarioController {

    public async createUsuario(req: Request, res: Response) {
        try {

            const body: CreateUsuarioRequestBody = req.body;
            if (!body.nome || !body.email || !body.telefone || !body.endereco || !body.dataNascimento || !body.senha) {
                throw new Error("Todos os campos são obrigatórios.");
            }
            const usuario = await UsuarioService.createUsuario(body);
            const logText = `Usuario foi Criado id: ${JSON.stringify(usuario._id)}`;
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
            const logText = `Usuario Atualizado id: ${JSON.stringify(updatedProduto._id)}`;
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
            const logText = `Usuario deletado: ${JSON.stringify(deletedUsuario._id)}`;
            await LogController.writeToTxt(logText);
            res.status(200).json(deletedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


export default new UsuarioController();