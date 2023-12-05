import { Usuarios } from "../models/Usuarios";
import { VERSION } from '../termoVersion';
import { CreateUsuarioRequestBody } from '../models/interfaces/usuario';
import { OpcaoTermoInterface } from "../models/interfaces/opcaoTermo";


class UsuarioService {
    public async createUsuario(body: CreateUsuarioRequestBody) {
        try {

            const usuario = {
                TermosUso: [],
                termoOpcoes: [],
                nome: body.nome,
                senha: body.senha,
                email: body.email,
                endereco: body.endereco,
                telefone: body.telefone,
                dataNascimento: body.dataNascimento,
                type: ""
            };

            const termo = {
                termo: body.termo.termo,
                aceite: body.termo.aceite,
                dataRegistro: new Date()
            }

            usuario.termoOpcoes = body.opcoes;
            usuario.TermosUso.push(termo);
            const response = await Usuarios.create(usuario);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
    public async findAllUsuarios() {
        try {
            const usuarios = await Usuarios.find().populate({
                path: 'TermosUso termoOpcoes',
                populate: {
                    path: 'termo opcaoTermo'
                }
            });
            return usuarios;
        } catch (error) {
            throw error;
        }
    }

    public async findUsuarioById(id: string) {
        try {
            const usuario = await Usuarios.findById(id).populate({
                path: 'TermosUso termoOpcoes',
                populate: {
                    path: 'termo opcaoTermo'
                }
            });
            return usuario;
        } catch (error) {
            throw error;
        }
    }

    public async updateUsuario(id: string, usuarioData: any) {
        try {
            const usuario = await Usuarios.findById(id);
            if (!usuario) {
                throw new Error(`Usuário ${id} não encontrado.`);
            }
            if (usuarioData.nome) {
                usuario.nome = usuarioData.nome;
            }
            if (usuarioData.email) {
                usuario.email = usuarioData.email;
            }
            if (usuarioData.telefone) {
                usuario.telefone = usuarioData.telefone;
            }
            if (usuarioData.endereco) {
                usuario.endereco = usuarioData.endereco;
            }
            if (usuarioData.dataNascimento) {
                usuario.dataNascimento = usuarioData.dataNascimento;
            }
            if (usuarioData.TermosUso) {
                usuario.TermosUso = usuarioData.TermosUso;
            }
            if (usuarioData.senha) {
                usuario.senha = usuarioData.senha;
            }
            if (usuarioData.type) {
                usuario.type = usuarioData.type;
            }
            const updatedUsuario = await usuario.save();
            return updatedUsuario;
        } catch (error) {
            throw error;
        }
    }

    public async deleteUsuario(id: string) {
        try {
            const UsuarioSelecionado = await Usuarios.findByIdAndDelete(id);
            return UsuarioSelecionado;
        } catch (error) {
            throw error
        }
    }

    public async updateOpcaoTermoUsuario(usuario, opcao){
        try{

            const updatedTermo = await usuario.updateOne({$push: {termoOpcoes: opcao}});
            return updatedTermo;
        }catch(error){
            throw error;
        }
    }
}

export default new UsuarioService();