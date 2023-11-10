import { Request, Response } from 'express';
import ProdutoService from '../services/ProdutoService';

class ProdutoCotroller {

    public async createProduto(req: Request, res: Response) {
        try {
            const novoProduto = req.body;
            const produto = await ProdutoService.createProduto(novoProduto);
            res.status(201).json(produto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async findAllProdutos(req: Request, res: Response) {
        try {
            const produtos = await ProdutoService.findAllProdutos();
            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateProduto(req: Request, res: Response) {
        try {
            const produtoId = req.params.id;
            const produtoData = req.body;
            const updatedProduto = await ProdutoService.updateProduto(produtoId, produtoData);
            res.status(200).json(updatedProduto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteProduct(req: Request, res: Response) {
        try {
            const produtoId = req.params.id;
            const deletedProduto = await ProdutoService.deleteProduto(produtoId);
            res.status(200).json(deletedProduto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}


export default new ProdutoCotroller();