export interface CreateOpcaoTermoRequestBody{
    descricao: string;
}

export interface OpcaoTermoInterface{
    _id: string;
    opcaoTermo: string;
    aceite: Boolean;
    dataRegistro: Date;
}