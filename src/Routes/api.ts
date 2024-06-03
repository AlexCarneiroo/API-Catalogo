import { Router } from "express";
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
router.put('/updatepromo/:id', ApiControlers.UpdadePromo)


export default router