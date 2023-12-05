import * as fs from 'fs';
import moment from 'moment'

class LogController {

    public async writeToTxt(textData: string): Promise<void> {
        try {
            const nomeDoArquivo = 'logs.txt';
            const conteudoParaEscrever = `Requisição: ${new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })} - ${textData}\n`;
            await fs.promises.appendFile(nomeDoArquivo, conteudoParaEscrever);
            console.log('Conteúdo escrito com sucesso!');
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado');
        }
    }
    public async searchByDateTime(dateTime: string): Promise<string | null> {
        try {
            const nomeDoArquivo = 'logs.txt';
            const conteudoDoArquivo = await fs.promises.readFile(nomeDoArquivo, 'utf-8');
            const linhas = conteudoDoArquivo.split('\n');
            const formatoDataHora = 'DD/MM/YYYY, HH:mm';
            const dataHoraRequisicao = moment(dateTime, formatoDataHora);
            const linhaEncontrada = linhas.find((linha) => {
                const match = linha.match(/Requisição: (\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2})/);
                if (match) {
                    const dataHoraRegistro = moment(match[1], formatoDataHora);
                    return dataHoraRequisicao.isSame(dataHoraRegistro);
                }
                return false;
            });

            return linhaEncontrada || null;
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado na busca');
        }
    }
    public async searchByUserId(userId: string): Promise<string[] | null> {
        try {
            const nomeDoArquivo = 'logs.txt';
            const conteudoDoArquivo = await fs.promises.readFile(nomeDoArquivo, 'utf-8');
            const linhas = conteudoDoArquivo.split('\n');
            const linhasDoUsuario = linhas.filter((linha) => linha.includes(`id: "${userId}"`));
            return linhasDoUsuario.length > 0 ? linhasDoUsuario : null;
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado na busca');
        }
    }
    public async searchLogs(query: { userId?: string, dateTime?: string }): Promise<string[] | string | null> {
        try {
            const nomeDoArquivo = 'logs.txt';
            const conteudoDoArquivo = await fs.promises.readFile(nomeDoArquivo, 'utf-8');
            const linhas = conteudoDoArquivo.split('\n');

            if (query.dateTime) {
                const formatoDataHora = 'DD/MM/YYYY, HH:mm';
                const dataHoraRequisicao = moment(query.dateTime, formatoDataHora);
                const linhaEncontrada = linhas.find((linha) => {
                    const match = linha.match(/Requisição: (\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2})/);
                    if (match) {
                        const dataHoraRegistro = moment(match[1], formatoDataHora);
                        return dataHoraRequisicao.isSame(dataHoraRegistro);
                    }
                    return false;
                });

                return linhaEncontrada || null;
            } else if (query.userId) {
                const linhasDoUsuario = linhas.filter((linha) => linha.includes(`id: "${query.userId}"`));
                return linhasDoUsuario.length > 0 ? linhasDoUsuario : null;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado na busca');
        }
    }
    public async searchLogsDateTime(query: { userId?: string, dateTime?: string, startDateTime?: string, endDateTime?: string }): Promise<string[] | string | null> {
        try {
            const nomeDoArquivo = 'logs.txt';
            const conteudoDoArquivo = await fs.promises.readFile(nomeDoArquivo, 'utf-8');
            const linhas = conteudoDoArquivo.split('\n');

            if (query.dateTime) {
                const formatoDataHora = 'DD/MM/YYYY, HH:mm';
                const dataHoraRequisicao = moment(query.dateTime, formatoDataHora);
                const linhaEncontrada = linhas.find((linha) => {
                    const match = linha.match(/Requisição: (\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2})/);
                    if (match) {
                        const dataHoraRegistro = moment(match[1], formatoDataHora);
                        return dataHoraRequisicao.isSame(dataHoraRegistro);
                    }
                    return false;
                });

                return linhaEncontrada || null;
            } else if (query.userId) {
                const linhasDoUsuario = linhas.filter((linha) => linha.includes(`id: "${query.userId}"`));
                return linhasDoUsuario.length > 0 ? linhasDoUsuario : null;
            } else if (query.startDateTime && query.endDateTime) {
                const formatoDataHora = 'DD/MM/YYYY, HH:mm';
                const startDateTime = moment(query.startDateTime, formatoDataHora);
                const endDateTime = moment(query.endDateTime, formatoDataHora);

                const linhasNoPeriodo = linhas.filter((linha) => {
                    const match = linha.match(/Requisição: (\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2})/);
                    if (match) {
                        const dataHoraRegistro = moment(match[1], formatoDataHora);
                        return dataHoraRegistro.isBetween(startDateTime, endDateTime, null, '[]');
                    }
                    return false;
                });

                return linhasNoPeriodo.length > 0 ? linhasNoPeriodo : null;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado na busca');
        }
    }


}
const logController = new LogController();


export default new LogController();
