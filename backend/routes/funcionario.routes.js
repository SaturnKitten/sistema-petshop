const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionario.controller');
const authenticateJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

router.get('/', authenticateJWT, funcionarioController.getAllFuncionarios);
router.get('/:id', authenticateJWT, funcionarioController.getFuncionarioById);

router.post(
    '/',
    authenticateJWT,
    [
        body('Nome').notEmpty().withMessage('Nome é obrigatório'),
        body('Cargo').notEmpty().withMessage('Cargo é obrigatório'),
        body('DataContratacao').notEmpty().withMessage('Data de contratação é obrigatória'),
        body('Salario').isDecimal().withMessage('Salário deve ser um número'),
    ],
    funcionarioController.createFuncionario
);

router.put(
    '/:id',
    authenticateJWT,
    [
        body('Nome').notEmpty().withMessage('Nome é obrigatório'),
        body('Cargo').notEmpty().withMessage('Cargo é obrigatório'),
        body('DataContratacao').notEmpty().withMessage('Data de contratação é obrigatória'),
        body('Salario').isDecimal().withMessage('Salário deve ser um número'),
    ],
    funcionarioController.updateFuncionario
);

router.delete('/:id', authenticateJWT, funcionarioController.deleteFuncionario);

module.exports = router;
