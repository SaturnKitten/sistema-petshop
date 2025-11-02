const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const authenticateJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

// Rotas protegidas com JWT
router.get('/', authenticateJWT, clienteController.getAllClientes);
router.get('/:id', authenticateJWT, clienteController.getClienteById);

router.post(
    '/',
    authenticateJWT,
    [
        body('Nome').notEmpty().withMessage('Nome é obrigatório'),
        body('Telefone').notEmpty().withMessage('Telefone é obrigatório'),
        body('Email').isEmail().withMessage('Email inválido'),
    ],
    clienteController.createCliente
);

router.put(
    '/:id',
    authenticateJWT,
    [
        body('Nome').notEmpty().withMessage('Nome é obrigatório'),
        body('Telefone').notEmpty().withMessage('Telefone é obrigatório'),
        body('Email').isEmail().withMessage('Email inválido'),
    ],
    clienteController.updateCliente
);

router.delete('/:id', authenticateJWT, clienteController.deleteCliente);

module.exports = router;
