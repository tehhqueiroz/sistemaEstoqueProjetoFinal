const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const { vendasModel } = require('./vendasModel');
const { produtosModel } = require('./produtosModel');

const vendasProdutosModel = sequelize.define('VendasProdutos', {
    ID_ProdutoVP: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: produtosModel,
            key: 'ID_Produto',
        },
        allowNull: false
    },
    ID_VendaVP: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: vendasModel,
            key: 'ID_Venda',
        },
        allowNull: false
    }
}, {
    tableName: 'VendasProdutos',
    timestamps: false
});

produtosModel.belongsToMany(vendasModel, {
    through: vendasProdutosModel,
    foreignKey: 'ID_ProdutoVP',
    as: 'produtosVendas'
});

vendasModel.belongsToMany(produtosModel, {
    through: vendasProdutosModel,
    foreignKey: 'ID_VendaVP',
    as: 'vendasProdutos'
});

module.exports = { vendasProdutosModel };