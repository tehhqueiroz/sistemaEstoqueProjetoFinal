const { timeStamp } = require('console');
const { sequelize } = require('../config/db');
const { DataTypes, ForeignKeyConstraintError } = require('sequelize');
const { fornecedoresModel } = require('./fornecedoresModel');
const { funcionariosModel } = require('./funcionariosModel');
const { produtosModel } = require('./produtosModel');

const movimentacaoModel = sequelize.define('Movimentacao',{
    ID_Movimentacao:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipoMovimentacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qtdMovimentacao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataMovimentacao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    idProdutoMovimentacao:{
        type: DataTypes.INTEGER,
        references: {
            model: produtosModel,
            key: 'ID_Produto',
        },
        allowNull: false
    }

    },{
    tableName: 'Movimentacao',
    timestamps: false
});

produtosModel.hasMany(movimentacaoModel,{foreignKey: 'idProdutoMovimentacao', as: 'Produto'});
movimentacaoModel.belongsTo(produtosModel, {foreignKey: 'idProdutoMovimentacao', as: 'Produto'});

module.exports = {movimentacaoModel};
