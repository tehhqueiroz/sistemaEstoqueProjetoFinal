const express = require("express");
const router = express.Router(); //instancia o router, um objeto do Express usado para definir rotas de forma modular e organizado

const {produtosController} = require('../controllers/produtosController');

//Rotas de Produtos
router.get("/", produtosController.listarProdutos); //Rota responsável por listar os Movimentacoes do sistema

router.post("/", produtosController.cadastrarProduto); //Rota responsável por cadastrar um novo Movimentacao.

router.put("/:ID_Produto", produtosController.atualizarProduto); // Rota responsavel por atualizar os dados de um Movimentacao.

router.delete("/:ID_Produto", produtosController.deletarProduto); // Rota responsavel por deletar um Movimentacao.

module.exports = {rotasProdutos: router};