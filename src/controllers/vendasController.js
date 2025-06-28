const { vendasModel } = require('../models/vendasModel');
const { Op } = require('sequelize');
const { parseDateBd } = require('../utils/dateUtils');

const vendasController = {
    // Listar vendas
    listarVendas: async (req, res) => {
        try {
            let { ID_Venda, formaPagamento, dataCompra } = req.query;

            let conditions = {};

            if (ID_Venda) {
                conditions.ID_Venda = ID_Venda;
            }

            if (formaPagamento) {
                conditions.formaPagamento = { [Op.substring]: formaPagamento };
            }

            if (dataCompra) {
                conditions.dataCompra = dataCompra;
            }

            let vendas = await vendasModel.findAll({
                where: {
                    [Op.or]: [
                        { ID_Venda: { [Op.eq]: conditions.ID_Venda } },
                        { formaPagamento: { [Op.substring]: conditions.formaPagamento } },
                        { dataCompra: { [Op.eq]: conditions.dataCompra } }
                    ]
                }
            });

            return res.status(200).json(vendas);
        } catch (error) {
            console.error("Erro ao listar vendas:", error);
            return res.status(500).json({ message: "Erro ao listar vendas" });
        }
    },

    // Cadastrar venda
    cadastrarVendas: async (req, res) => {
        try {
            const {
                formaPagamento,
                valorTotal,
                dataCompra,
                idFuncionarioVenda,
                idClienteVenda
            } = req.body;

            // Validação
            if (!formaPagamento || !valorTotal || !dataCompra || !idFuncionarioVenda || !idClienteVenda) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            // Verifica se o funcionário existe
            const funcionario = await vendasModel.sequelize.models.funcionariosModel.findByPk(idFuncionarioVenda);
            if (!funcionario) {
                return res.status(404).json({ message: "Funcionário não encontrado!" });
            }

            // Verifica se o cliente existe
            const cliente = await vendasModel.sequelize.models.clientesModel.findByPk(idClienteVenda);
            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado!" });
            }

            // Cria a nova venda
            await vendasModel.create({
                formaPagamento,
                valorTotal,
                dataCompra,
                idFuncionarioVenda,
                idClienteVenda
            });

            return res.status(201).json({ message: "Venda cadastrada com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar venda:", error);
            return res.status(500).json({ message: "Erro ao cadastrar venda" });
        }
    },

    // Atualizar dados de uma venda
    atualizarVendas: async (req, res) => {
        try {
            const { ID_Venda } = req.params;
            const {
                formaPagamento,
                valorTotal,
                dataCompra,
                idFuncionarioVenda,
                idClienteVenda
            } = req.body;

            // Verifica se a venda existe
            let venda = await vendasModel.findByPk(ID_Venda);

            if (!venda) {
                return res.status(404).json({ message: "Venda não encontrada" });
            }

            // Verifica se o funcionário  existe, caso seja alterado
            if (idFuncionarioVenda) {
                const funcionario = await vendasModel.sequelize.models.funcionariosModel.findByPk(idFuncionarioVenda);
                if (!funcionario) {
                    return res.status(404).json({ message: "Funcionário não encontrado!" });
                }
            }

            // Verifica se o cliente existe, caso seja alterado
            if (idClienteVenda) {
                const cliente = await vendasModel.sequelize.models.clientesModel.findByPk(idClienteVenda);
                if (!cliente) {
                    return res.status(404).json({ message: "Cliente não encontrado!" });
                }
            }

            // Atualiza os dados da venda
            let dadosAtualizados = {
                formaPagamento,
                valorTotal,
                dataCompra,
                idFuncionarioVenda,
                idClienteVenda
            };
            await vendasModel.update(dadosAtualizados, { where: { ID_Venda } });

            // Retorna a venda atualizada
            venda = await vendasModel.findByPk(ID_Venda);
            return res.status(200).json({ message: "Venda atualizada com sucesso!", Venda: venda });
        } catch (error) {
            console.error("Erro ao atualizar venda:", error);
            return res.status(500).json({ message: "Erro ao atualizar venda" });
        }
    },

    // Deletar uma venda
    deletarVendas: async (req, res) => {
        try {
            const { ID_Venda } = req.params;

            // Verifica se a venda existe
            let venda = await vendasModel.findByPk(ID_Venda);

            if (!venda) {
                return res.status(404).json({ message: "Venda não encontrada" });
            }

            // Remove a venda
            let result = await vendasModel.destroy({ where: { ID_Venda } });

           
            if (result > 0) {
                return res.status(200).json({ message: `Venda excluída com sucesso!` });
            } else {
                return res.status(404).json({ message: "Erro ao excluir venda!" });
            }
        } catch (error) {
            console.error("Erro ao excluir venda:", error);
            return res.status(500).json({ message: "Erro ao excluir venda" });
        }
    }
};

module.exports = { vendasController };