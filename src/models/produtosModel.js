const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const { fornecedoresModel } = require('./fornecedoresModel');
const { funcionariosModel } = require('./funcionariosModel');

const produtosModel = sequelize.define('Produtos',{
    ID_Produto:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeProduto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoriaProduto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qtdMin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCadastro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dataVencimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    codigoSku: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idFuncionarioProduto:{
        type: DataTypes.INTEGER,
        references: {
            model: funcionariosModel,
            key: 'ID_Funcionario',
        },
        allowNull: false
    },
    idFornecedorProduto:{
        type: DataTypes.INTEGER,
        references: {
            model: fornecedoresModel,
            key: 'ID_Fornecedor',
        },
        allowNull: false
    },
    qtdAtual: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoProduto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }

    },{
    tableName: 'Produtos',
    timestamps: false
});

funcionariosModel.hasMany(produtosModel,{foreignKey: 'idFuncionarioProduto', as: 'funcionariosProdutos'});
fornecedoresModel.hasMany(produtosModel,{foreignKey: 'idFornecedorProduto', as: 'fornecedoresProdutos'});
produtosModel.belongsTo(funcionariosModel, {foreignKey: 'idFuncionarioProduto', as: 'produtosFuncionarios'});
produtosModel.belongsTo(fornecedoresModel, {foreignKey: 'idFornecedorProduto', as: 'produtosFornecedores'});

module.exports = {produtosModel};