const express = require("express");
const router = express.Router(); // Instancia o router, um objeto do Express usado para definir rotas de forma modular e organizada

const { vendasProdutosController } = require('../controllers/vendasProdutosController');

// Rotas de VendasProdutos
router.get("/", vendasProdutosController.listarVendasProdutos); // Rota para listar todas as associações entre vendas e produtos

router.post("/", vendasProdutosController.associarProdutoAVenda); // Rota para associar um produto a uma venda (criar uma nova associação)

router.delete("/:ID_ProdutoVP/:ID_VendaVP", vendasProdutosController.desassociarProdutoDeVenda); // Rota para remover uma associação específica entre um produto e uma venda

module.exports = { rotasVendasProdutos: router };