// frontend/routes/rtFuncionario.js
const express = require('express');
const router = express.Router();

// Exemplo de rota para listar os funcionários
router.get('/', (req, res) => {
    // Aqui você pode adicionar lógica para buscar os funcionários, por exemplo
    res.send('Listar Funcionários');
});

// Exemplo de rota para inserir um novo funcionário
router.post('/inserir', (req, res) => {
    // Aqui você pode adicionar lógica para inserir um novo funcionário
    res.send('Novo Funcionário Inserido');
});

module.exports = router;
