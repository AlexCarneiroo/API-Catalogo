import express , {Request , Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import bodyparse from 'body-parser'



dotenv.config()
const server = express()
server.use(cors())
server.use(bodyparse.json())


server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});
server.listen(process.env.PORT)