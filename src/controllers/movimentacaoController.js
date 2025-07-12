const { movimentacaoModel } = require('../models/movimentacaoModel');
const { Op } = require('sequelize');
const { parseDateBd } = require('../utils/dateUtils');

const movimentacaoController = {
    // Listar movimentações
listarMovimentacoes: async (req, res) => {
    try {
        const { ID_Movimentacao, tipoMovimentacao, dataMovimentacao } = req.query;

        const filtrosOR = [];

        if (ID_Movimentacao) {
            filtrosOR.push({ ID_Movimentacao });
        }

        if (tipoMovimentacao) {
            filtrosOR.push({ tipoMovimentacao: { [Op.substring]: tipoMovimentacao } });
        }

        if (dataMovimentacao) {
            filtrosOR.push({ dataMovimentacao });
        }

        const where = filtrosOR.length > 0 ? { [Op.or]: filtrosOR } : {};

        const movimentacoes = await movimentacaoModel.findAll({ where });

        return res.status(200).json(movimentacoes);
    } catch (error) {
        console.error("Erro ao listar movimentações:", error);
        return res.status(500).json({ message: "Erro ao listar movimentações" });
    }
},

    // Cadastrar movimentação
    cadastrarMovimentacao: async (req, res) => {
        try {
            const { tipoMovimentacao, qtdMovimentacao, dataMovimentacao, idProdutoMovimentacao } = req.body;

            // Validação
            if (!tipoMovimentacao || !qtdMovimentacao || !dataMovimentacao || !idProdutoMovimentacao) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            // Verifica se o produto existe
            const produto = await movimentacaoModel.sequelize.models.produtosModel.findByPk(idProdutoMovimentacao);
            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado!" });
            }

            // Cria a nova movimentação
            await movimentacaoModel.create({
                tipoMovimentacao,
                qtdMovimentacao,
                dataMovimentacao,
                idProdutoMovimentacao
            });

            return res.status(201).json({ message: "Movimentação cadastrada com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar movimentação:", error);
            return res.status(500).json({ message: "Erro ao cadastrar movimentação" });
        }
    },

    // Atualizar dados de uma movimentação
    atualizarMovimentacao: async (req, res) => {
        try {
            const { ID_Movimentacao } = req.params;
            const { tipoMovimentacao, qtdMovimentacao, dataMovimentacao, idProdutoMovimentacao } = req.body;

            // Verifica se a movimentação existe
            let movimentacao = await movimentacaoModel.findByPk(ID_Movimentacao);

            if (!movimentacao) {
                return res.status(404).json({ message: "Movimentação não encontrada" });
            }

            // Verifica se o produto existe
            if (idProdutoMovimentacao) {
                const produto = await movimentacaoModel.sequelize.models.produtosModel.findByPk(idProdutoMovimentacao);
                if (!produto) {
                    return res.status(404).json({ message: "Produto não encontrado!" });
                }
            }

            // Atualiza os dados da movimentação
            let dadosAtualizados = { tipoMovimentacao, qtdMovimentacao, dataMovimentacao, idProdutoMovimentacao };
            await movimentacaoModel.update(dadosAtualizados, { where: { ID_Movimentacao } });

            // Retorna a movimentação atualizada
            movimentacao = await movimentacaoModel.findByPk(ID_Movimentacao);
            return res.status(200).json({ message: "Movimentação atualizada com sucesso!", Movimentacao: movimentacao });
        } catch (error) {
            console.error("Erro ao atualizar movimentação:", error);
            return res.status(500).json({ message: "Erro ao atualizar movimentação" });
        }
    },

    // Deletar uma movimentação
    deletarMovimentacao: async (req, res) => {
        try {
            const { ID_Movimentacao } = req.params;

            // Verifica se a movimentação existe
            let movimentacao = await movimentacaoModel.findByPk(ID_Movimentacao);

            if (!movimentacao) {
                return res.status(404).json({ message: "Movimentação não encontrada" });
            }

            // Remove a movimentação
            let result = await movimentacaoModel.destroy({ where: { ID_Movimentacao } });

    
            if (result > 0) {
                return res.status(200).json({ message: `Movimentação excluída com sucesso!` });
            } else {
                return res.status(404).json({ message: "Erro ao excluir movimentação!" });
            }
        } catch (error) {
            console.error("Erro ao excluir movimentação:", error);
            return res.status(500).json({ message: "Erro ao excluir movimentação" });
        }
    }
};

module.exports = { movimentacaoController };