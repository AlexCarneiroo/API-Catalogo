import { Router } from "express";
import * as ApiControlers from '../Controllers/ApiControlers';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import multer from 'multer';

const router = Router();

// Configuração do Multer para o armazenamento temporário de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/tmp'); // Especifique o diretório de destino para os arquivos temporários
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Gere um nome de arquivo único
    }
});

// Configuração do Multer para lidar com o upload de arquivos
const upload = multer({ storage: storage });

// Configurar o cliente S3 com as credenciais
const s3Config = {
    region: 'sa-east-1', // Sua região da AWS
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
};

// Criar uma instância do cliente S3
const s3 = new S3Client(s3Config);

// Função para fazer upload da imagem para o S3
async function uploadImageToS3(file: Express.Multer.File): Promise<string> {
    const uploadParams = {
        Bucket: 'catalogoimg21', // Seu nome de bucket
        Key: Date.now() + '-' + file.originalname, // Nome do arquivo no S3
        Body: Readable.from(file.buffer), // Conteúdo do arquivo
        ContentType: file.mimetype // Tipo de conteúdo
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        const data = await s3.send(command);
        console.log('Successfully uploaded image to S3:', data);
        // Retorna a URL da imagem no S3
        return `URL_DA_SUA_IMAGEM_AQUI/${uploadParams.Key}`;
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
}


// Rota para criar um produto com imagens
router.post('/create', upload.array('imagens', 10), async (req, res) => {
    try {
        // Verificar se existem arquivos para fazer upload
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada' });
        }

        const files = req.files as Express.Multer.File[];

        // Fazer upload de cada imagem para o S3 e coletar as URLs
        const uploadedImages = [];
        for (const file of files) {
            const uploadedImage = await uploadImageToS3(file);
            uploadedImages.push(uploadedImage);
        }

        // Chamar o controlador para criar o produto com as URLs das imagens no S3
        await ApiControlers.CreateProduto(req, res, uploadedImages);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

// Outras rotas...
router.get('/all', ApiControlers.AllProdutos);
router.delete('/delete/:id', ApiControlers.DeleleProduto);
router.put('/update/:id', ApiControlers.UpdadeMaisVendidos);
router.put('/updatepromocao/:id', ApiControlers.UpdadePromo);

export default router;



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