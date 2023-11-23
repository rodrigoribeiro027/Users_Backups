import * as fs from 'fs';

class LogController {

    public async writeToTxt(textData: string): Promise<void> {
        try {
            const nomeDoArquivo =  'logs.txt'; 
            const conteudoParaEscrever = `Requisição: ${new Date()} - ${textData}\n`;
            await fs.promises.appendFile(nomeDoArquivo, conteudoParaEscrever);
            console.log('Conteúdo escrito com sucesso!');
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado');
        }
    }
}
const logController = new LogController();


export default new LogController();
