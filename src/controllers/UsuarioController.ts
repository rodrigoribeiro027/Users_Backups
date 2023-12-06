import { Request, Response, response } from 'express';
import UsuarioService from '../services/UsuarioService';
import UsuariosDeleteService from '../services/RegistrosDeleteService';
import LogController from './LogController';
import { CreateUsuarioRequestBody } from '../models/interfaces/usuario';
import OpcaoTermoService from '../services/OpcaoTermoService';
import TermoService from '../services/TermoService';


class UsuarioController {
    public async createUsuario(req: Request, res: Response) {
        try {
            const body: CreateUsuarioRequestBody = req.body;
            if (!body.termo.aceite) {
                return res.status(401).json({ message: 'Necessario aprovação dos termos de uso' })
            }
            if (!body.nome || !body.email || !body.telefone || !body.endereco || !body.dataNascimento || !body.senha) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }
            const usuario = await UsuarioService.createUsuario(body);
            const logText = `Tipo de açâo: Criação de Usuario, Usuario foi Criado id: ${JSON.stringify(usuario._id)}`;
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
            const updatedUsuario = await UsuarioService.updateUsuario(usuarioId, usuarioData);
            const logText = `Tipo de açâo: Atualização de Usuario, Usuario do id: ${JSON.stringify(updatedUsuario._id)} foi atualizado`;
            await LogController.writeToTxt(logText);
            res.status(200).json(updatedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const usuario = await UsuarioService.findUsuarioById(id);
            if (!usuario) {
                return res.status(404).json({ message: `Usuario ${id} não encontrado.` });
            }
            const deletedUsuario = await UsuarioService.deleteUsuario(id);
            if (!deletedUsuario) {
                return res.status(404).json({ message: `Usuario ${id} não encontrado.` });
            }
            await UsuariosDeleteService.insertDeleteRegister(usuario);
            const logText = `Tipo de açâo: DELETE,Usuario foi deletado: ${JSON.stringify(deletedUsuario._id)}`;
            await LogController.writeToTxt(logText);
            res.status(200).json(deletedUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async alterarOuAdicionarNovaOpcaoTermoUsuario(req: Request, res: Response) {
        try {
            const body: { id: string, aceite: boolean } = req.body;
            const id = res.locals.jwtPayload._id;
            const usuario = await UsuarioService.findUsuarioById(id);
            if (!usuario) {
                return res.status(404).json({ message: `Usuario ${id} não encontrado.` });
            }
            const opcao = await OpcaoTermoService.findOpcaoTermoById(body.id);
            if (!opcao) {
                return res.status(404).json({ message: `Opção ${body.id} não encontrada.` });
            }
            let existe = false;
            let opcaoTermoAntigo;
            const opcoesAgrupadas = usuario.termoOpcoes.reduce((accumulator, current) => {
                const key = current.opcaoTermo._id.toString();

                if (!accumulator[key] || accumulator[key].dataRegistro < current.dataRegistro) {
                    accumulator[key] = {
                        opcaoTermo: current.opcaoTermo,
                        aceite: current.aceite,
                        dataRegistro: current.dataRegistro,
                    };
                } else {
                    accumulator[key].aceite = current.aceite;
                }

                return accumulator;
            }, {});
            let resultado = Object.values(opcoesAgrupadas);

            for (let i = 0; i < resultado.length; i++) {
                const resultadoItem = resultado[i] as { opcaoTermo?: { _id: string }, aceite: boolean };
                if (opcao._id.toString() === resultadoItem.opcaoTermo._id.toString()) {
                    existe = true;
                    opcaoTermoAntigo = resultadoItem;
                    break;
                }
            }

            let value;
            if (existe) {
                value = !opcaoTermoAntigo.aceite;
            } else {
                value = body.aceite;
            }
            const opcaoTermo = {
                aceite: value,
                opcaoTermo: opcao._id,
                dataRegistro: new Date()
            };

            const ret = await UsuarioService.updateOpcaoTermoUsuario(usuario, opcaoTermo);
            res.status(200).json(ret);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }


    public async atualizarTermoUsuario(req: Request, res: Response){
        try{
            const { _id } = res.locals.jwtPayload;
            const usuario = await UsuarioService.findUsuarioById(_id);
            if(!usuario){
                return res.status(404).json("Usuario não encontrado.");
            }

            const { id, aceite }: {id:string, aceite: boolean} = req.body;
            const termo = await TermoService.findTermoById(id);
            if(!termo){
                return res.status(404).json("Termo não encontrado");
            }

            // verificar se o termo enviado pelo body é a ultima versão
            const ultimaVersao = await TermoService.findLastVersion();
            if(termo.versao !== ultimaVersao.versao){
                return res.status(403).json(`O termo ${id} está desatualiazado, por favor aceite a versão mais recente.`);
            }

            // verifica se o aceite enviado pro usuario é false, caso seja irá excluir o usuario
            if(!aceite){
                await UsuarioService.deleteUsuario(_id);
                await UsuariosDeleteService.insertDeleteRegister(usuario, "Recusa do termo.");
                return res.status(500).json("Usuário excluído com sucesso devido à recusa do termo.")
            }

            const ret = await UsuarioService.updateTermoUsuario(usuario, termo);
            return res.status(200).json({ message: "Termo aceito com sucesso." });

        }catch(error){
            res.status(500).json({ error: error })
        }
    }
}


export default new UsuarioController();