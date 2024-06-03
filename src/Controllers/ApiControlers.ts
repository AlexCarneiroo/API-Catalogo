import { Request, Response } from "express";


import { Produtos } from "../Models/produtos";
import { promiseHooks } from "v8";

// Função para tentar interpretar o campo 'imagens' corretamente
function interpretarImagens(dado:any) {
    if (!dado) {
        return []; // Retorna um array vazio se não houver dados
    }
    try {
        // Primeiro, tenta parsear assumindo que é JSON válido
        const resultado = JSON.parse(dado);
        if (Array.isArray(resultado)) {
            return resultado; // Se for um array, retorna o resultado do parse
        }
    } catch (e) {
        // Se der erro no parse, assume que o dado é um único caminho de arquivo
    }
    return [dado]; // Retorna o dado como um item de array
}

export const AllProdutos = async (req: Request, res: Response) => {
    try {
        let allProdutos = await Produtos.findAll();
        const produtosComImagens = allProdutos.map(produto => ({
            ...produto.toJSON(),
            imagens: interpretarImagens(produto.dataValues.imagens),
        }));
        res.json(produtosComImagens);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


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

        const imagensPath = JSON.stringify(imagens);
        //const imagensPath = JSON.stringify(["/caminho/estatico/imagem1.jpg", "/caminho/estatico/imagem2.jpg"]);

        const { nome, categoria, valor, subCategoria, detalhe } = req.body;

        const newProduto = await Produtos.create({ nome, detalhe, valor, categoria, subCategoria, imagens:imagensPath });
        res.json({ id: newProduto.id, newProduto });
        console.log(res.status)
        console.log(newProduto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const UpdadeMaisVendidos = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { maisVendidos } = req.body; 

    try {
        const produto = await Produtos.findByPk(id);

        if (produto) {
            produto.maisVendidos = maisVendidos; 
            await produto.save(); 

            res.json({ success: true, produto });
        } else {
            res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar o produto'});
    }
}

export const UpdadePromo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { promocao } = req.body; 

    try {
        const produto = await Produtos.findByPk(id);

        if (produto) {
            produto.promocao = promocao; 
            await produto.save(); 

            res.json({ success: true, produto });
        } else {
            res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar o produto'});
    }
}
