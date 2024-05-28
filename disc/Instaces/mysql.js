"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Substitua pelos valores reais do seu banco de dados RDS
const dbName = 'produtos';
const dbUser = 'root';
const dbPassword = 'alex2003';
const dbHost = 'catalogo.c164u6c64wo7.us-east-1.rds.amazonaws.com'; // Endpoint correto da instância RDS
const dbPort = 3306; // Porta padrão do MySQL
exports.sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort
});
// Testar a conexão
exports.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createConnection({
    host: 'database-1.xxxxxxxx.us-east-1.rds.amazonaws.com',
    user: 'catalogo', // Nome de usuário do RDS
    password: 'your_password', // Senha do RDS
    database: 'your_database' // Nome do banco de dados criado no RDS
});
connection.connect((err) => {
    if (err) {
        console.error('Erro de conexão: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como id ' + connection.threadId);
});
