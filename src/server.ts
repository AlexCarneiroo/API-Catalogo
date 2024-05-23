import express , {Request , Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import bodyparse from 'body-parser'

import api from './Routes/api'



dotenv.config()
const server = express()
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(cors())
server.use(bodyparse.json())

server.get("/" , (req:Request , res:Response)=>{
    res.send('Ola , Seja Bem vindo!!!')
    console.log("Testando....")
})


server.use(api)



server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});
server.listen(process.env.PORT)

