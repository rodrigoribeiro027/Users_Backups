import * as fs from 'fs';

class LogController {

    public async writeToTxt(textData: string): Promise<void> {
        try {
            const nomeDoArquivo = 'logs.txt';
            const conteudoParaEscrever = `Requisição: ${new Date()} - ${textData}\n`;
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
            const linhaEncontrada = linhas.find((linha) => linha.includes(dateTime));
            return linhaEncontrada || null;
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado na busca');
        }
    }
}
const logController = new LogController();


export default new LogController();
