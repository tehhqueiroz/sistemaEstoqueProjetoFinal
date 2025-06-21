const Sequelize = require('sequelize');

const MSSQL_HOST = 'localhost'; //servidor local
const MSSQL_USER = 'sa'; //usuario do servidor de banco de dados
const MSSQL_PASSWORD = '123456789'; //senha de acesso ao servidor de banco de dados

const MSSQL_DB = 'sistemaMercado'; //nome do banco de dados
const MSSQL_PORT = '1433'; // Porta de acesso ao servidor do SQL Server
const MSSQL_DIALECT = 'mssql'; //Definicao do dialeto de banco de dados (Sistema de gerenciamento de banco de dados) como microsoft SQL Server.

const sequelize = new Sequelize(MSSQL_DB, MSSQL_USER, MSSQL_PASSWORD, {
    dialect: MSSQL_DIALECT,
    host: MSSQL_HOST,
    port: MSSQL_PORT

});

// async function testeConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Conexão estabelecida com sucesso!');
//     } catch (error) {
//         console.error('Não foi possíve conectar ao banco de dados', error);
        
//     }
// }

// testeConnection();

module.exports = {sequelize};