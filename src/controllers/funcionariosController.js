const { funcionariosModel } = require('../models/funcionariosModel');
const { Op } = require('sequelize');
const { parseDateBd } = require('../utils/dateUtils');

const funcionariosController = {
    // Listar funcionários
listarFuncionarios: async (req, res) => {
    try {
        const { ID_Funcionario, nomeFuncionario, emailFuncionario } = req.query;

        const filtrosOR = [];

        if (ID_Funcionario) {
            filtrosOR.push({ ID_Funcionario });
        }

        if (nomeFuncionario) {
            filtrosOR.push({ nomeFuncionario: { [Op.substring]: nomeFuncionario } });
        }

        if (emailFuncionario) {
            filtrosOR.push({ emailFuncionario });
        }

        const where = filtrosOR.length > 0 ? { [Op.or]: filtrosOR } : {};

        const funcionarios = await funcionariosModel.findAll({ where });

        return res.status(200).json(funcionarios);
    } catch (error) {
        console.error("Erro ao listar funcionários:", error);
        return res.status(500).json({ message: "Erro ao listar funcionários" });
    }
},

    // Cadastrar funcionário
    cadastrarFuncionario: async (req, res) => {
        try {
            const { nomeFuncionario, emailFuncionario, senhaFuncionario, nivelAcesso } = req.body;

            // Validação
            if (!nomeFuncionario || !emailFuncionario || !senhaFuncionario || !nivelAcesso) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            // Verifica se o email já está cadastrado
            let funcionarioExistente = await funcionariosModel.findOne({
                where: {
                    emailFuncionario
                }
            });

            if (funcionarioExistente) {
                return res.status(409).json({ message: "Email já cadastrado!" });
            }

            // Cria o novo funcionário
            await funcionariosModel.create({
                nomeFuncionario,
                emailFuncionario,
                senhaFuncionario,
                nivelAcesso
            });
            return res.status(201).json({ message: "Funcionário cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
            return res.status(500).json({ message: "Erro ao cadastrar funcionário" });
        }
    },

    // Atualizar dados de um funcionário
    atualizarFuncionario: async (req, res) => {
        try {
            const { ID_Funcionario } = req.params;
            const { nomeFuncionario, emailFuncionario, senhaFuncionario, nivelAcesso } = req.body;

            // Verifica se o funcionário existe
            let funcionario = await funcionariosModel.findByPk(ID_Funcionario);

            if (!funcionario) {
                return res.status(404).json({ message: "Funcionário não encontrado" });
            }

            // Verifica se o email já está sendo usado por outro funcionário
            if (emailFuncionario) {
                let funcionarioExistente = await funcionariosModel.findOne({
                    where: {
                        emailFuncionario
                    }
                });

                if (funcionarioExistente && funcionarioExistente.ID_Funcionario !== parseInt(ID_Funcionario)) {
                    return res.status(409).json({ message: "Email já cadastrado para outro funcionário!" });
                }
            }

            // Atualiza os dados do funcionário
            let dadosAtualizados = { nomeFuncionario, emailFuncionario, senhaFuncionario, nivelAcesso };
            await funcionariosModel.update(dadosAtualizados, { where: { ID_Funcionario } });

            // Retorna o funcionário atualizado
            funcionario = await funcionariosModel.findByPk(ID_Funcionario);
            return res.status(200).json({ message: "Funcionário atualizado com sucesso!", Funcionario: funcionario });
        } catch (error) {
            console.error("Erro ao atualizar funcionário:", error);
            return res.status(500).json({ message: "Erro ao atualizar funcionário" });
        }
    },

    // Deletar um funcionário
    deletarFuncionario: async (req, res) => {
        try {
            const { ID_Funcionario } = req.params;

            // Verifica se o funcionário existe
            let funcionario = await funcionariosModel.findByPk(ID_Funcionario);

            if (!funcionario) {
                return res.status(404).json({ message: "Funcionário não encontrado" });
            }

            // Remove o funcionário
            let nomeFuncionario = funcionario.nomeFuncionario;

            // Exclui o funcionário usando where
            let result = await funcionariosModel.destroy({ where: { ID_Funcionario } });

            
            if (result > 0) {
                return res.status(200).json({ message: `${nomeFuncionario} foi excluído com sucesso!` });
            } else {
                return res.status(404).json({ message: "Erro ao excluir funcionário!" });
            }
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error);
            return res.status(500).json({ message: "Erro ao excluir funcionário" });
        }
    }
};

module.exports = { funcionariosController };