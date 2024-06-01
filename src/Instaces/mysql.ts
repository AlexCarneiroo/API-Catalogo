import { Sequelize } from 'sequelize';
import { Model , DataTypes } from "sequelize";

// Substitua pelos valores reais do seu banco de dados RDS
const dbName = 'catalogo';
const dbUser = 'admin';
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


