const express = require("express");
const router = express.Router(); //instancia o router, um objeto do Express usado para definir rotas de forma modular e organizado

const {movimentacaoController} = require('../controllers/movimentacaoController');

//Rotas de Movimentacao
router.get("/", movimentacaoController.listarMovimentacoes); //Rota responsável por listar os Movimentacoes do sistema

router.post("/", movimentacaoController.cadastrarMovimentacao); //Rota responsável por cadastrar um novo Movimentacao.

router.put("/:ID_Movimentacao", movimentacaoController.atualizarMovimentacao); // Rota responsavel por atualizar os dados de um Movimentacao.

router.delete("/:ID_Movimentacao", movimentacaoController.deletarMovimentacao); // Rota responsavel por deletar um Movimentacao.

module.exports = {rotasMovimentacao: router};