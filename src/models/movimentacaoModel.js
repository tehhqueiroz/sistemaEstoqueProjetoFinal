const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const { produtosModel } = require('./produtosModel');

const movimentacaoModel = sequelize.define('Movimentacao', {
    ID_Movimentacao: {
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
    idProdutoMovimentacao: {
        type: DataTypes.INTEGER,
        references: {
            model: produtosModel,
            key: 'ID_Produto',
        },
        allowNull: false
    }

}, {
    tableName: 'Movimentacao',
    timestamps: false
});

produtosModel.hasMany(movimentacaoModel, { foreignKey: 'idProdutoMovimentacao', as: 'produtoMovimentacao' });
movimentacaoModel.belongsTo(produtosModel, { foreignKey: 'idProdutoMovimentacao', as: 'movimentacaoProduto' });

module.exports = { movimentacaoModel };
