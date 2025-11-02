const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar rotas
const clienteRoutes = require('./routes/cliente.routes');
const animalRoutes = require('./routes/animal.routes');
const contaReceberRoutes = require('./routes/contaReceber.routes');
const recebimentoRoutes = require('./routes/recebimento.routes');
const funcionarioRoutes = require('./routes/funcionario.routes');

// Middleware de erro
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middlewares globais
app.use(cors());
app.use(bodyParser.json()); // Para ler JSON do corpo das requisições

// Rotas do sistema
app.use('/clientes', clienteRoutes);
app.use('/animais', animalRoutes);
app.use('/contasReceber', contaReceberRoutes);
app.use('/recebimentos', recebimentoRoutes);
app.use('/funcionarios', funcionarioRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API do Sistema Petshop rodando!' });
});

// Middleware de erro (sempre por último)
app.use(errorHandler);

module.exports = app;
