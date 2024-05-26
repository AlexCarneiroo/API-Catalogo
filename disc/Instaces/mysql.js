"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize('produtos', // Nome do banco de dados
'root', // Nome do usuário
'alex2003', // Senha
{
    dialect: 'mysql',
    port: 3306 // Porta padrão do MySQL
});
