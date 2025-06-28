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



module.exports = {sequelize};

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();


