import moment from 'moment';
import { Usuarios } from "../models/Usuarios";
import TermoService from './TermoService';


class UsuarioService {
    public async createUsuario(nome, email, senha, telefone, endereco, dataNascimento, termos, type) {
        try {

            if (!nome || !email || !telefone || !endereco || !dataNascimento || !senha || !type) {
                throw new Error("Todos os campos são obrigatórios.");
            }

            let termosDoUsuario = []
            for(let i = 0; i < termos.length; i++){
                let id= termos[i].id
                let ret = await TermoService.findByID(id);
                const obj = {
                    termo_id: ret._id,
                    aceito: termos[i].aceito,
                    data_de_aceito: termos[i].aceito ? new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"}) : null,
                    data_atualizacao: null
                };
                termosDoUsuario.push(obj);
            }

            const usuario = {
                dataCadastro: moment().format('YYYY-MM-DD HH:mm:ss'),
                TermosUso: termosDoUsuario,
                nome: nome,
                senha: senha,
                email: email,
                endereco: endereco,
                telefone: telefone,
                dataNascimento: dataNascimento,
                type: type
            }

            const response = await Usuarios.create(usuario);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
    public async findAllUsuarios() {
        try {
            const usuarios = await Usuarios.find().populate({
                path: 'TermosUso.termo_id',
                options: { strictPopulate: false }
            });
            return usuarios;
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
}

export default new UsuarioService();