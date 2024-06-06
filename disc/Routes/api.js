"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ApiControlers = __importStar(require("../Controllers/ApiControlers"));
const client_s3_1 = require("@aws-sdk/client-s3");
const stream_1 = require("stream");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
// Configuração do Multer para o armazenamento temporário de arquivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/tmp'); // Especifique o diretório de destino para os arquivos temporários
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Gere um nome de arquivo único
    }
});
// Configuração do Multer para lidar com o upload de arquivos
const upload = (0, multer_1.default)({ storage: storage });
// Configurar o cliente S3 com as credenciais
const s3Config = {
    region: 'sa-east-1', // Sua região da AWS
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
};
// Criar uma instância do cliente S3
const s3 = new client_s3_1.S3Client(s3Config);
// Função para fazer upload da imagem para o S3
function uploadImageToS3(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadParams = {
            Bucket: 'catalogoimg21', // Seu nome de bucket
            Key: Date.now() + '-' + file.originalname, // Nome do arquivo no S3
            Body: stream_1.Readable.from(file.buffer), // Conteúdo do arquivo
            ContentType: file.mimetype // Tipo de conteúdo
        };
        try {
            const command = new client_s3_1.PutObjectCommand(uploadParams);
            const data = yield s3.send(command);
            console.log('Successfully uploaded image to S3:', data);
            // Retorna a URL da imagem no S3
            return `URL_DA_SUA_IMAGEM_AQUI/${uploadParams.Key}`;
        }
        catch (error) {
            console.error('Error uploading image to S3:', error);
            throw error;
        }
    });
}
// Rota para criar um produto com imagens
router.post('/create', upload.array('imagens', 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificar se existem arquivos para fazer upload
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada' });
        }
        const files = req.files;
        // Fazer upload de cada imagem para o S3 e coletar as URLs
        const uploadedImages = [];
        for (const file of files) {
            const uploadedImage = yield uploadImageToS3(file);
            uploadedImages.push(uploadedImage);
        }
        // Chamar o controlador para criar o produto com as URLs das imagens no S3
        yield ApiControlers.CreateProduto(req, res, uploadedImages);
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
}));
// Outras rotas...
router.get('/all', ApiControlers.AllProdutos);
router.delete('/delete/:id', ApiControlers.DeleleProduto);
router.put('/update/:id', ApiControlers.UpdadeMaisVendidos);
router.put('/updatepromocao/:id', ApiControlers.UpdadePromo);
exports.default = router;
/* import { Router } from "express";
import * as ApiControlers from '../Controllers/ApiControlers'
import multer from 'multer'
import path from "path";



const router = Router();
export const storage = multer.diskStorage({
    destination:(req, file , cb)=>{
        cb(null , './public/tmp')
    },

    filename:(req, file , cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    },

})
const upload = multer({ storage:storage });
router.post('/create' , upload.array('imagens', 10) , ApiControlers.CreateProduto);



router.get('/all' , ApiControlers.AllProdutos)
router.delete('/delete/:id', ApiControlers.DeleleProduto)
router.put('/update/:id', ApiControlers.UpdadeMaisVendidos)
router.put('/updatepromocao/:id', ApiControlers.UpdadePromo)


export default router */ 
