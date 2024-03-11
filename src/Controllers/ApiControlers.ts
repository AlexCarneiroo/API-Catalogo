import { Request, Response } from "express";


import { Produtos } from "../Models/produtos";

export const AllProdutos = async (req: Request, res: Response) => {
    let AllProdutos = await Produtos.findAll()
    res.json(AllProdutos)
}

export const DeleleProduto = async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        await Produtos.destroy({ where: { id } })
    } catch (error) {
        console.error(error);
        console.log(res.status)
    }
}

export const CreateProduto = async (req: Request, res: Response) => {
    try {
        let imagens = [];
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                let filePath = file.path.replace(/\\/g, '/').split('public')[1];
                imagens.push(filePath);
            }
        } else {
            return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
        }

        const imagensPath = imagens.join(';');


        const { nome, categoria, valor, subCategoria, detalhe } = req.body;
        if (!nome || !categoria || !valor || !subCategoria || !detalhe) {
            console.log({ erro: true })
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }
        const newProduto = await Produtos.create({ nome, detalhe, valor, categoria, subCategoria, imagens:imagensPath });
        res.json({ id: newProduto.id, newProduto });
        console.log(res.status)
        console.log(newProduto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


