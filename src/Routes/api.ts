import { Router } from "express";
import * as ApiControlers from '../Controllers/ApiControlers'

const router = Router();

router.get('/all' , ApiControlers.AllProdutos)
router.delete('/delete/:id', ApiControlers.DeleleProduto)
router.post('/create' , ApiControlers.CreateProduto)


export default router