const { clientesModel } = require('../models/clientesModel');
const { Op } = require('sequelize');
const {parseDateBd} = require('../utils/dateUtils')


const clientesController = {
    // Listar clientes
listarClientes: async (req, res) => {
  try {
    const { ID_Cliente, nomeCliente, cpfCliente } = req.query;

    // array que receberá somente os filtros existentes
    const filtrosOR = [];

    if (ID_Cliente) {
      filtrosOR.push({ ID_Cliente: { [Op.eq]: ID_Cliente } });
    }

    if (nomeCliente) {
      filtrosOR.push({ nomeCliente: { [Op.substring]: nomeCliente } });
    }

    if (cpfCliente) {
      filtrosOR.push({ cpfCliente: { [Op.eq]: cpfCliente } });
    }

    // Se tiver filtros, aplica OR; senão where fica vazio ⇒ lista todos
    const where = filtrosOR.length > 0 ? { [Op.or]: filtrosOR } : {};

    const clientes = await clientesModel.findAll({ where });

    return res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return res.status(500).json({ message: 'Erro ao listar clientes' });
  }
},

    cadastrarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente, emailCliente, celularCliente } = req.body;

        // Validação
        if (!nomeCliente || !cpfCliente) {
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
        }

        // Verifica se o CPF ou email já estão cadastrados
        let clienteExistente = await clientesModel.findOne({
            where: {
                [Op.or]: [
                    { cpfCliente }, // Verifica se o CPF já existe
                    { emailCliente } // Verifica se o email já existe (se fornecido)
                ]
            }
        });

        if (clienteExistente) {
            if (clienteExistente.cpfCliente === cpfCliente) {
                return res.status(409).json({ message: "CPF já cadastrado!" });
            }
            if (clienteExistente.emailCliente === emailCliente) {
                return res.status(409).json({ message: "Email já cadastrado!" });
            }
        }

            // Cria o novo cliente
            await clientesModel.create({ nomeCliente, cpfCliente, emailCliente, celularCliente });
            return res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            return res.status(500).json({ message: "Erro ao cadastrar cliente" });
        }
    },

    // Atualizar dados de um cliente
    atualizarCliente: async (req, res) => {
        try {
            const { ID_Cliente } = req.params;
            const { nomeCliente, cpfCliente, emailCliente, celularCliente } = req.body;

            // Verifica se o cliente existe
            let cliente = await clientesModel.findByPk(ID_Cliente);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }

            // Verifica se o CPF já está sendo usado por outro cliente
            if (cpfCliente || emailCliente) {
                let clienteExistente = await clientesModel.findOne({
                    where: {
                        [Op.or]: [
                            { cpfCliente }, // Verifica se o CPF já existe
                            { emailCliente } // Verifica se o email já existe
                        ]
                    }
                });

                if (clienteExistente && clienteExistente.ID_Cliente !== parseInt(ID_Cliente)) {
                    return res.status(409).json({ message: "Email ou CPF já cadastrados para outro cliente!" });
                }
            }

            // Atualiza os dados do cliente
            let dadosAtualizados = { nomeCliente, cpfCliente, emailCliente, celularCliente };
            await clientesModel.update(dadosAtualizados, { where: { ID_Cliente } });

            // Retorna o cliente atualizado
            cliente = await clientesModel.findByPk(ID_Cliente);
            return res.status(200).json({ message: "Cliente atualizado com sucesso!", Cliente: cliente });
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            return res.status(500).json({ message: "Erro ao atualizar cliente" });
        }
    },

    // Deletar um cliente
    deletarCliente: async (req, res) => {
        try {
            const { ID_Cliente } = req.params;

            // Verifica se o cliente existe
            let cliente = await clientesModel.findByPk(ID_Cliente);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }

        // Remove o cliente
        let nomeCliente = cliente.nomeCliente;

        // Exclui o cliente usando o modelo com a cláusula WHERE
        let result = await clientesModel.destroy({where: { ID_Cliente }});

        // Verifica se a exclusão foi bem-sucedida
        if (result > 0) {
            return res.status(200).json({ message: `${nomeCliente} foi excluído com sucesso!` });
        } else {
            return res.status(404).json({ message: "Erro ao excluir cliente!" });
        }

    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        return res.status(500).json({ message: "Erro ao excluir cliente" });
    }
}
}
module.exports = { clientesController };