import { Produtos } from "../models/Produtos";

class ProdutosService {
    public async createProduto(produto) {
        try {
            if (!produto.nome || !produto.descricao || !produto.preco || !produto.quantidade) {
                throw new Error("Todos os campos (nome, descricao, preco e quantidade) são obrigatórios.");
            }
            const response = await Produtos.create(produto);
            return response;
        } catch (error) {
            throw error;
        }
    }
    public async findAllProdutos() {
        try {
            const produtos = await Produtos.find();
            return produtos;
        } catch (error) {
            throw error;
        }
    }

    public async updateProduto(id: string, produtoData: any) {
        try {
            const produto = await Produtos.findByIdAndUpdate(id, {}, { new: true });
            if (!produto) {
                throw new Error(`Produto ${id} não encontrado.`);
            }

            if (produtoData.nome) {
                produto.nome = produtoData.nome;
            }
            if (produtoData.descricao) {
                produto.descricao = produtoData.descricao;
            }
            if (produtoData.preco) {
                produto.preco = produtoData.preco;
            }
            if (produtoData.quantidade) {
                produto.quantidade = produtoData.quantidade;
            }

            const updatedProduto = await produto.save();
            return updatedProduto;
        } catch (error) {
            throw error;
        }
    }
    public async deleteProduto(id: string) {
        try {
            const deleteProduto = await Produtos.findByIdAndDelete(id);
            return deleteProduto
        } catch (error) {
            throw error
        }
    }
}

export default new ProdutosService();