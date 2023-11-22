import * as fs from 'fs';

class LogController {

    public async writeToTxt(txtFileName: string, textData: string): Promise<void> {
        try {
            const nomeDoArquivo = txtFileName || 'logs.txt'; 
            const conteudoParaEscrever = `Requisição: ${new Date()} - ${textData}\n`;
            await fs.promises.appendFile(nomeDoArquivo, conteudoParaEscrever);
            console.log('Conteúdo escrito com sucesso!');
        } catch (error) {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado');
        }
    }

    public async testLogController(): Promise<void> {
        const txtFileName = 'logs.log';
        const textData = 'Texto que será salvo no arquivo.';
    
        try {   
            await this.writeToTxt(txtFileName, textData);
            console.log('Escrita no arquivo concluída com sucesso!');
        } catch (error) {
            console.error('Erro durante o teste:', error);
        }
    }
}
const logController = new LogController();

logController.testLogController();

export default new LogController();
