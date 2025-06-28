const express = require("express");
const router = express.Router(); //instancia o router, um objeto do Express usado para definir rotas de forma modular e organizado

const {funcionariosController} = require('../controllers/funcionariosController');

//Rotas de Funcionarios
router.get("/", funcionariosController.listarFuncionarios); //Rota responsável por listar os Funcionarios do sistema

router.post("/", funcionariosController.cadastrarFuncionario); //Rota responsável por cadastrar um novo Funcionario.

router.put("/:ID_Funcionario", funcionariosController.atualizarFuncionario); // Rota responsavel por atualizar os dados de um Funcionario.

router.delete("/:ID_Funcionario", funcionariosController.deletarFuncionario); // Rota responsavel por deletar um Funcionario.

module.exports = {rotasFuncionarios: router};