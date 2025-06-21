const { timeStamp } = require('console');
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const fornecedoresModel = sequelize.define('Fornecedores',{
    ID_Fornecedor:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeFornecedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpjFornecedor:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailFornecedor:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    celularFornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    enderecoFornecedor:{
        type: DataTypes.STRING,
        allowNull: false
    }

    },{
    tableName: 'Fornecedores',
    timestamps: false //tem que deixar falso para nao criar colunas que nao tem
    
});

module.exports = {fornecedoresModel};