const express = require("express");

//rotas
const { rotasClientes }        = require('./src/routes/clientesRoutes');
const { rotasFornecedores }    = require('./src/routes/fornecedoresRoutes');
const { rotasFuncionarios }    = require('./src/routes/funcionariosRoutes');
const { rotasMovimentacao }    = require('./src/routes/movimentacaoRoutes');
const { rotasProdutos }        = require('./src/routes/produtosRoutes');
const { rotasVendas }          = require('./src/routes/vendasRoutes');
const { rotasVendasProdutos }  = require('./src/routes/vendasProdutosRoutes');

// APP
const app = express(); 
const PORT = 8081; // porta 
app.use(express.json()); 

// Rotas
app.use("/clientes",        rotasClientes);
app.use("/fornecedores",    rotasFornecedores);
app.use("/funcionarios",    rotasFuncionarios);
app.use("/movimentacoes",   rotasMovimentacao);
app.use("/produtos",        rotasProdutos);
app.use("/vendas",          rotasVendas);
app.use("/vendas-produtos", rotasVendasProdutos);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});