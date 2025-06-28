const { timeStamp } = require('console');
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const funcionariosModel = sequelize.define('Funcionarios',{
    ID_Funcionario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeFuncionario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailFuncionario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    senhaFuncionario:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nivelAcesso:{
        type: DataTypes.STRING,
        allowNull: false,
    }

    },{
    tableName: 'Funcionarios',
    timestamps: false //tem que deixar falso para nao criar colunas que nao tem
    
});

module.exports = {funcionariosModel};