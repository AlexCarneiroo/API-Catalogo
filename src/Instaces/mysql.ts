import { Sequelize } from 'sequelize';

// Substitua pelos valores reais do seu banco de dados RDS
const dbName = 'produtos';
const dbUser = 'root';
const dbPassword = 'alex2003';
const dbHost = 'catalogo.c164u6c64wo7.us-east-1.rds.amazonaws.com'; // Endpoint correto da instância RDS
const dbPort = 3306; // Porta padrão do MySQL

export const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  {
    host: dbHost,
    dialect: 'mysql',
    port: dbPort
  }
);

// Testar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


import mysql from "mysql2"

const connection = mysql.createConnection({
  host: 'database-1.xxxxxxxx.us-east-1.rds.amazonaws.com',
  user: 'admin',          // Nome de usuário do RDS
  password: 'alex2003', // Senha do RDS
  database: 'catalogo'  // Nome do banco de dados criado no RDS
});

connection.connect((err:any) => {
  if (err) {
    console.error('Erro de conexão: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

