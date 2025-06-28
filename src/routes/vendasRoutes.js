const express = require("express");
const router = express.Router(); //instancia o router, um objeto do Express usado para definir rotas de forma modular e organizado

const {vendasController} = require('../controllers/vendasController');

//Rotas de Vendas
router.get("/", vendasController.listarVendas); //Rota responsável por listar os Vendas do sistema

router.post("/", vendasController.cadastrarVendas); //Rota responsável por cadastrar um novo Vendas.

router.put("/:ID_Vendas", vendasController.atualizarVendas); // Rota responsavel por atualizar os dados de um Vendas.

router.delete("/:ID_Vendas", vendasController.deletarVendas); // Rota responsavel por deletar um Vendas.

module.exports = {rotasVendas: router};