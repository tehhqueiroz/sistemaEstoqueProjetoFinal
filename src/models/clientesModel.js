const { timeStamp } = require('console');
const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const clientesModel = sequelize.define('Clientes',{
    ID_Cliente:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpfCliente:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailCliente:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    celularCliente:{
        type: DataTypes.STRING,
        allowNull: true
    }

    },{
    tableName: 'Clientes',
    timestamps: false //tem que deixar falso para nao criar colunas que nao tem
    
});

module.exports = {clientesModel};