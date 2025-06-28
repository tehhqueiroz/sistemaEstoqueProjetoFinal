const { produtosModel } = require('../models/produtosModel');
const { Op } = require('sequelize');
const { parseDateBd } = require('../utils/dateUtils');

const produtosController = {
    // Listar produtos
    listarProdutos: async (req, res) => {
        try {
            let { ID_Produto, nomeProduto, categoriaProduto, codigoSku } = req.query;

            let conditions = {};

            if (ID_Produto) {
                conditions.ID_Produto = ID_Produto;
            }

            if (nomeProduto) {
                conditions.nomeProduto = { [Op.substring]: nomeProduto };
            }

            if (categoriaProduto) {
                conditions.categoriaProduto = { [Op.substring]: categoriaProduto };
            }

            if (codigoSku) {
                conditions.codigoSku = codigoSku;
            }

            let produtos = await produtosModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_Produto: { [Op.eq]: conditions.ID_Produto } },
                        { nomeProduto: { [Op.substring]: conditions.nomeProduto } },
                        { categoriaProduto: { [Op.substring]: conditions.categoriaProduto } },
                        { codigoSku: { [Op.eq]: conditions.codigoSku } }
                    ]
                }
            });

            return res.status(200).json(produtos);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return res.status(500).json({ message: "Erro ao listar produtos" });
        }
    },

    // Cadastrar produto
    cadastrarProduto: async (req, res) => {
        try {
            const {
                nomeProduto,
                categoriaProduto,
                qtdMin,
                dataCadastro,
                dataVencimento,
                codigoSku,
                idFuncionarioProduto,
                idFornecedorProduto,
                qtdAtual,
                precoProduto
            } = req.body;

            // Validação
            if (
                !nomeProduto ||
                !categoriaProduto ||
                !qtdMin ||
                !dataCadastro ||
                !dataVencimento ||
                !codigoSku ||
                !idFuncionarioProduto ||
                !idFornecedorProduto ||
                !qtdAtual ||
                !precoProduto
            ) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            // Verifica se o funcionário associado existe
            const funcionario = await produtosModel.sequelize.models.funcionariosModel.findByPk(idFuncionarioProduto);
            if (!funcionario) {
                return res.status(404).json({ message: "Funcionário não encontrado!" });
            }

            // Verifica se o fornecedor associado existe
            const fornecedor = await produtosModel.sequelize.models.fornecedoresModel.findByPk(idFornecedorProduto);
            if (!fornecedor) {
                return res.status(404).json({ message: "Fornecedor não encontrado!" });
            }

            // Cria o novo produto
            await produtosModel.create({
                nomeProduto,
                categoriaProduto,
                qtdMin,
                dataCadastro,
                dataVencimento,
                codigoSku,
                idFuncionarioProduto,
                idFornecedorProduto,
                qtdAtual,
                precoProduto
            });

            return res.status(201).json({ message: "Produto cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            return res.status(500).json({ message: "Erro ao cadastrar produto" });
        }
    },

    // Atualizar dados de um produto
    atualizarProduto: async (req, res) => {
        try {
            const { ID_Produto } = req.params;
            const {
                nomeProduto,
                categoriaProduto,
                qtdMin,
                dataCadastro,
                dataVencimento,
                codigoSku,
                idFuncionarioProduto,
                idFornecedorProduto,
                qtdAtual,
                precoProduto
            } = req.body;

            // Verifica se o produto existe
            let produto = await produtosModel.findByPk(ID_Produto);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            // Verifica se o funcionário associado existe, caso seja alterado
            if (idFuncionarioProduto) {
                const funcionario = await produtosModel.sequelize.models.funcionariosModel.findByPk(idFuncionarioProduto);
                if (!funcionario) {
                    return res.status(404).json({ message: "Funcionário não encontrado!" });
                }
            }

            // Verifica se o fornecedor associado existe, caso seja alterado
            if (idFornecedorProduto) {
                const fornecedor = await produtosModel.sequelize.models.fornecedoresModel.findByPk(idFornecedorProduto);
                if (!fornecedor) {
                    return res.status(404).json({ message: "Fornecedor não encontrado!" });
                }
            }

            // Atualiza os dados do produto
            let dadosAtualizados = {
                nomeProduto,
                categoriaProduto,
                qtdMin,
                dataCadastro,
                dataVencimento,
                codigoSku,
                idFuncionarioProduto,
                idFornecedorProduto,
                qtdAtual,
                precoProduto
            };
            await produtosModel.update(dadosAtualizados, { where: { ID_Produto } });

            // Retorna o produto atualizado
            produto = await produtosModel.findByPk(ID_Produto);
            return res.status(200).json({ message: "Produto atualizado com sucesso!", Produto: produto });
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            return res.status(500).json({ message: "Erro ao atualizar produto" });
        }
    },

    // Deletar um produto
    deletarProduto: async (req, res) => {
        try {
            const { ID_Produto } = req.params;

            // Verifica se o produto existe
            let produto = await produtosModel.findByPk(ID_Produto);

            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            // Remove o produto
            let result = await produtosModel.destroy({ where: { ID_Produto } });

            // Verifica se a exclusão foi bem-sucedida
            if (result > 0) {
                return res.status(200).json({ message: `${produto.nomeProduto} foi excluído com sucesso!` });
            } else {
                return res.status(404).json({ message: "Erro ao excluir produto!" });
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            return res.status(500).json({ message: "Erro ao excluir produto" });
        }
    }
};

module.exports = { produtosController };