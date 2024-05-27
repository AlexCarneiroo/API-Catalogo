"use strict";
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
