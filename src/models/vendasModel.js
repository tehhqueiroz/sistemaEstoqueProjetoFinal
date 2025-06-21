const { timeStamp } = require('console');
const { sequelize } = require('../config/db');
const { DataTypes, ForeignKeyConstraintError } = require('sequelize');
const { fornecedoresModel } = require('./fornecedoresModel');
const { funcionariosModel } = require('./funcionariosModel');
const { produtosModel } = require('./produtosModel');
const { clientesModel } = require('./clientesModel');

const vendasModel = sequelize.define('Vendas',{
    ID_Venda:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    formaPagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idFuncionarioVenda:{
        type: DataTypes.INTEGER,
        references: {
            model: funcionariosModel,
            key: 'ID_Funcionario',
        },
        allowNull: false
    },
    idClienteVenda:{
        type: DataTypes.INTEGER,
        references: {
            model: clientesModel,
            key: 'ID_Cliente',
        },
        allowNull: false
    }

    },{
    tableName: 'Vendas',
    timestamps: false
});

funcionariosModel.hasMany(vendasModel,{foreignKey: 'idFuncionarioVenda', as: 'Funcionario'});
clientesModel.hasMany(vendasModel,{foreignKey: 'idClienteVenda', as: 'Clientes'});
vendasModel.belongsTo(funcionariosModel, {foreignKey: 'idFuncionarioVenda', as: 'Funcionario'});
vendasModel.belongsTo(clientesModel, {foreignKey: 'idClienteVenda', as: 'Clientes'});

module.exports = {vendasModel};

