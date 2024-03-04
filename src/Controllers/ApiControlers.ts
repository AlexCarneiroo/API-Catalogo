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

export const CreateProduto = async (req: Request, res: Response) =>{
    try{
        const { nome, categoria, valor, subCategoria, detalhe } = req.body;

        const newProduto = await Produtos.create({nome , detalhe , valor , categoria , subCategoria });
        res.json({ id: newProduto.id , newProduto });
        console.log(newProduto);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
} 