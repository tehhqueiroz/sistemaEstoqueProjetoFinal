const express = require("express");
const router = express.Router(); //instancia o router, um objeto do Express usado para definir rotas de forma modular e organizado

const {clientesController} = require('../controllers/clientesController');

//Rotas de Clientes
router.get("/", clientesController.listarClientes); //Rota responsável por listar os Clientes do sistema

router.post("/", clientesController.cadastrarCliente); //Rota responsável por cadastrar um novo Cliente.

router.put("/:ID_Cliente", clientesController.atualizarCliente); // Rota responsavel por atualizar os dados de um Cliente.

router.delete("/:ID_Cliente", clientesController.deletarCliente); // Rota responsavel por deletar um Cliente.

module.exports = {rotasClientes: router};