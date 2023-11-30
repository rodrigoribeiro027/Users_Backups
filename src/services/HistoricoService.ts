import historico from "../models/HistoricoOpcao";

class HistoricoService {
    public async findByID(id) {
        try {
            const ret = await historico.findById(id);
            return ret
        } catch (error) {
            throw error;
        }
    }
    public async deleteHistorico(id: string) {
        try {
            const deletehistorico = await historico.findByIdAndDelete(id);
            return deletehistorico
        } catch (error) {
            throw error
        }
    }
}



export default new HistoricoService();