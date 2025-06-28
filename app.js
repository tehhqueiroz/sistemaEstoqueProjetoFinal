const express = require("express");
//importacao de rotas
const {rotasClientes} = require('./src/routes/clientesRoutes');
//APP
const app = express(); //Cria uma instancia do express, armazenando todos os metodos e funcionalidades em app.

const PORT = 8081; // Define a porta em que o servidor irá escutar as requisições

app.use(express.json()); // configura o body-parser para interpretar corpos de requisicao no formato json.

//Rota para clientes
app.use("/clientes", rotasClientes);


app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})
  