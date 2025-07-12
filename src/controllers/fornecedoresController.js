const { fornecedoresModel } = require('../models/fornecedoresModel');
const { Op } = require('sequelize');
const { parseDateBd } = require('../utils/dateUtils');

const fornecedoresController = {
    // Listar fornecedores
listarFornecedores: async (req, res) => {
  try {
    const { ID_Fornecedor, nomeFornecedor, cnpjFornecedor } = req.query;

    const filtrosOR = [];
    if (ID_Fornecedor)   filtrosOR.push({ ID_Fornecedor });
    if (nomeFornecedor)  filtrosOR.push({ nomeFornecedor: { [Op.substring]: nomeFornecedor } });
    if (cnpjFornecedor)  filtrosOR.push({ cnpjFornecedor });

    const where = filtrosOR.length > 0 ? { [Op.or]: filtrosOR } : {};  // 👈 aqui é a mudança

    const fornecedores = await fornecedoresModel.findAll({ where });

    return res.status(200).json(fornecedores);
  } catch (error) {
    console.error('Erro ao listar fornecedores:', error);
    return res.status(500).json({ message: 'Erro ao listar fornecedores' });
  }
},

    // Cadastrar fornecedor
    cadastrarFornecedor: async (req, res) => {
        try {
            const { nomeFornecedor, cnpjFornecedor, emailFornecedor, celularFornecedor, enderecoFornecedor } = req.body;

            // Validação
            if (!nomeFornecedor || !cnpjFornecedor || !emailFornecedor || !celularFornecedor || !enderecoFornecedor) {
                return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
            }

            // Verifica se o CNPJ ou email já estão cadastrados
            let fornecedorExistente = await fornecedoresModel.findOne({
                where: {
                    [Op.or]: [
                        { cnpjFornecedor }, // Verifica se o CNPJ já existe
                        { emailFornecedor } // Verifica se o email já existe
                    ]
                }
            });

            if (fornecedorExistente) {
                if (fornecedorExistente.cnpjFornecedor === cnpjFornecedor) {
                    return res.status(409).json({ message: "CNPJ já cadastrado!" });
                }
                if (fornecedorExistente.emailFornecedor === emailFornecedor) {
                    return res.status(409).json({ message: "Email já cadastrado!" });
                }
            }

            // Cria o novo fornecedor
            await fornecedoresModel.create({
                nomeFornecedor,
                cnpjFornecedor,
                emailFornecedor,
                celularFornecedor,
                enderecoFornecedor
            });
            return res.status(201).json({ message: "Fornecedor cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar fornecedor:", error);
            return res.status(500).json({ message: "Erro ao cadastrar fornecedor" });
        }
    },

    // Atualizar dados de um fornecedor
    atualizarFornecedor: async (req, res) => {
        try {
            const { ID_Fornecedor } = req.params;
            const { nomeFornecedor, cnpjFornecedor, emailFornecedor, celularFornecedor, enderecoFornecedor } = req.body;

            // Verifica se o fornecedor existe
            let fornecedor = await fornecedoresModel.findByPk(ID_Fornecedor);

            if (!fornecedor) {
                return res.status(404).json({ message: "Fornecedor não encontrado" });
            }

            // Verifica se o CNPJ ou email já estão sendo usados por outro fornecedor
            if (cnpjFornecedor || emailFornecedor) {
                let fornecedorExistente = await fornecedoresModel.findOne({
                    where: {
                        [Op.or]: [
                            { cnpjFornecedor }, // Verifica se o CNPJ já existe
                            { emailFornecedor } // Verifica se o email já existe
                        ]
                    }
                });

                if (fornecedorExistente && fornecedorExistente.ID_Fornecedor !== parseInt(ID_Fornecedor)) {
                    return res.status(409).json({ message: "CNPJ ou Email já cadastrados para outro fornecedor!" });
                }
            }

            // Atualiza os dados do fornecedor
            let dadosAtualizados = { nomeFornecedor, cnpjFornecedor, emailFornecedor, celularFornecedor, enderecoFornecedor };
            await fornecedoresModel.update(dadosAtualizados, { where: { ID_Fornecedor } });

            // Retorna o fornecedor atualizado
            fornecedor = await fornecedoresModel.findByPk(ID_Fornecedor);
            return res.status(200).json({ message: "Fornecedor atualizado com sucesso!", Fornecedor: fornecedor });
        } catch (error) {
            console.error("Erro ao atualizar fornecedor:", error);
            return res.status(500).json({ message: "Erro ao atualizar fornecedor" });
        }
    },

    // Deletar um fornecedor
    deletarFornecedor: async (req, res) => {
        try {
            const { ID_Fornecedor } = req.params;

            // Verifica se o fornecedor existe
            let fornecedor = await fornecedoresModel.findByPk(ID_Fornecedor);

            if (!fornecedor) {
                return res.status(404).json({ message: "Fornecedor não encontrado" });
            }

            // Remove o fornecedor
            let nomeFornecedor = fornecedor.nomeFornecedor;

            // Exclui o fornecedor usando WHERE
            let result = await fornecedoresModel.destroy({ where: { ID_Fornecedor } });

        
            if (result > 0) {
                return res.status(200).json({ message: `${nomeFornecedor} foi excluído com sucesso!` });
            } else {
                return res.status(404).json({ message: "Erro ao excluir fornecedor!" });
            }
        } catch (error) {
            console.error("Erro ao excluir fornecedor:", error);
            return res.status(500).json({ message: "Erro ao excluir fornecedor" });
        }
    }
};

module.exports = { fornecedoresController };