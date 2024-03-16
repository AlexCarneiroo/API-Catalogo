"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdadeMaisVendidos = exports.CreateProduto = exports.DeleleProduto = exports.AllProdutos = void 0;
const produtos_1 = require("../Models/produtos");
// Função para tentar interpretar o campo 'imagens' corretamente
function interpretarImagens(dado) {
    if (!dado) {
        return []; // Retorna um array vazio se não houver dados
    }
    try {
        // Primeiro, tenta parsear assumindo que é JSON válido
        const resultado = JSON.parse(dado);
        if (Array.isArray(resultado)) {
            return resultado; // Se for um array, retorna o resultado do parse
        }
    }
    catch (e) {
        // Se der erro no parse, assume que o dado é um único caminho de arquivo
    }
    return [dado]; // Retorna o dado como um item de array
}
const AllProdutos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allProdutos = yield produtos_1.Produtos.findAll();
        const produtosComImagens = allProdutos.map(produto => (Object.assign(Object.assign({}, produto.toJSON()), { imagens: interpretarImagens(produto.dataValues.imagens) })));
        res.json(produtosComImagens);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.AllProdutos = AllProdutos;
const DeleleProduto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        yield produtos_1.Produtos.destroy({ where: { id } });
    }
    catch (error) {
        console.error(error);
        console.log(res.status);
    }
});
exports.DeleleProduto = DeleleProduto;
const CreateProduto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imagens = [];
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                let filePath = file.path.replace(/\\/g, '/').split('public')[1];
                imagens.push(filePath);
            }
        }
        else {
            return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
        }
        const imagensPath = JSON.stringify(imagens);
        //const imagensPath = JSON.stringify(["/caminho/estatico/imagem1.jpg", "/caminho/estatico/imagem2.jpg"]);
        const { nome, categoria, valor, subCategoria, detalhe } = req.body;
        const newProduto = yield produtos_1.Produtos.create({ nome, detalhe, valor, categoria, subCategoria, imagens: imagensPath });
        res.json({ id: newProduto.id, newProduto });
        console.log(res.status);
        console.log(newProduto);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.CreateProduto = CreateProduto;
const UpdadeMaisVendidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { maisVendidos } = req.body;
    try {
        const produto = yield produtos_1.Produtos.findByPk(id);
        if (produto) {
            produto.maisVendidos = maisVendidos;
            yield produto.save();
            res.json({ success: true, produto });
        }
        else {
            res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar o produto' });
    }
});
exports.UpdadeMaisVendidos = UpdadeMaisVendidos;
