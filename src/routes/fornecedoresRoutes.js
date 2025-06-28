const express = require("express");
const router = express.Router(); //instancia o router, um objeto do Express usado para definir rotas de forma modular e organizado

const {fornecedoresController} = require('../controllers/fornecedoresController');

//Rotas de fornecedores
router.get("/", fornecedoresController.listarFornecedores); //Rota responsável por listar os fornecedores do sistema

router.post("/", fornecedoresController.cadastrarFornecedor); //Rota responsável por cadastrar um novo fornecedor.

router.put("/:ID_Fornecedor", fornecedoresController.atualizarFornecedor); // Rota responsavel por atualizar os dados de um fornecedor.

router.delete("/:ID_Fornecedor", fornecedoresController.deletarFornecedor); // Rota responsavel por deletar um fornecedor.

module.exports = {rotasFornecedores: router};