const { vendasProdutosModel } = require('../models/vendasProdutosModel');
const { produtosModel } = require('../models/produtosModel');
const { vendasModel } = require('../models/vendasModel');
const { Op } = require('sequelize');

const vendasProdutosController = {
    // Listar as associações entre vendas e produtos
    listarVendasProdutos: async (req, res) => {
        try {
            let { ID_ProdutoVP, ID_VendaVP } = req.query;

            let conditions = {};

            if (ID_ProdutoVP) {
                conditions.ID_ProdutoVP = ID_ProdutoVP;
            }

            if (ID_VendaVP) {
                conditions.ID_VendaVP = ID_VendaVP;
            }

            let vendasProdutos = await vendasProdutosModel.findAll({
                where: {
                    [Op.and]: [
                        { ID_ProdutoVP: { [Op.eq]: conditions.ID_ProdutoVP } },
                        { ID_VendaVP: { [Op.eq]: conditions.ID_VendaVP } }
                    ]
                }
            });

            return res.status(200).json(vendasProdutos);
        } catch (error) {
            console.error("Erro ao listar associações de vendas e produtos:", error);
            return res.status(500).json({ message: "Erro ao listar associações de vendas e produtos" });
        }
    },

    // Associar um produto a uma venda
    associarProdutoAVenda: async (req, res) => {
        try {
            const { ID_ProdutoVP, ID_VendaVP } = req.body;

            // Validação
            if (!ID_ProdutoVP || !ID_VendaVP) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            // Verifica se o produto existe
            const produto = await produtosModel.findByPk(ID_ProdutoVP);
            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }

            // Verifica se a venda existe
            const venda = await vendasModel.findByPk(ID_VendaVP);
            if (!venda) {
                return res.status(404).json({ message: "Venda não encontrada!" });
            }

            // Verifica se a associação já existe
            const associacaoExistente = await vendasProdutosModel.findOne({
                where: {
                    ID_ProdutoVP,
                    ID_VendaVP
                }
            });

            if (associacaoExistente) {
                return res.status(409).json({ message: "Esta associação já existe!" });
            }

            // Cria a nova associação
            await vendasProdutosModel.create({
                ID_ProdutoVP,
                ID_VendaVP
            });

            return res.status(201).json({ message: "Produto associado à venda com sucesso!" });
        } catch (error) {
            console.error("Erro ao associar produto à venda:", error);
            return res.status(500).json({ message: "Erro ao associar produto à venda" });
        }
    },

    // Desassociar um produto de uma venda
    desassociarProdutoDeVenda: async (req, res) => {
        try {
            const { ID_ProdutoVP, ID_VendaVP } = req.params;

            // Verifica se a associação existe
            const associacao = await vendasProdutosModel.findOne({
                where: {
                    ID_ProdutoVP,
                    ID_VendaVP
                }
            });

            if (!associacao) {
                return res.status(404).json({ message: "Associação não encontrada" });
            }

            // Remove a associação
            let result = await vendasProdutosModel.destroy({
                where: {
                    ID_ProdutoVP,
                    ID_VendaVP
                }
            });

            // Verifica se a exclusão foi bem-sucedida
            if (result > 0) {
                return res.status(200).json({ message: "Produto desassociado da venda com sucesso!" });
            } else {
                return res.status(404).json({ message: "Erro ao desassociar produto da venda!" });
            }
        } catch (error) {
            console.error("Erro ao desassociar produto da venda:", error);
            return res.status(500).json({ message: "Erro ao desassociar produto da venda" });
        }
    }
};

module.exports = { vendasProdutosController };