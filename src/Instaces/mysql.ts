import { Sequelize } from "sequelize";

import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize(
    'produtos', // Nome do banco de dados
    'root',      // Nome do usuário
    'alex2003',  // Senha
    {
        dialect: 'mysql',
        port: 3306 // Porta padrão do MySQL
    }
);