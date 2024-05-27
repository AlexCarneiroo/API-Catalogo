import { Sequelize } from 'sequelize';

// Substitua esses valores pelos dados do seu banco de dados
const dbName = 'produtos';
const dbUser = 'root';
const dbPassword = 'alex2003';
const dbHost = 'mydbinstance.abcdefghijk.us-west-2.rds.amazonaws.com'; // Substitua pelo endpoint da sua instância RDS
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
