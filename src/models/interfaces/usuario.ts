export interface CreateUsuarioRequestBody {
    nome: string;
    email: string;
    cpf: Number;
    senha: string;
    telefone: string;
    endereco: string;
    dataNascimento: Date;
    termo: {
        termo:string,
        aceite: Boolean
    };
    opcoes: [
        {
            opcaoTermo:string,
            aceite: Boolean
        }
    ]
}