const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaReceber.controller');
const authenticateJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

router.get('/', authenticateJWT, contaController.getAllContasReceber);
router.get('/:id', authenticateJWT, contaController.getContaReceberById);

router.post(
    '/',
    authenticateJWT,
    [
        body('Descricao').notEmpty().withMessage('Descrição é obrigatória'),
        body('DataLancamento').notEmpty().withMessage('Data de lançamento é obrigatória'),
        body('Valor').isDecimal().withMessage('Valor deve ser um número'),
        body('ID_Cliente').isInt().withMessage('ID do cliente deve ser um número'),
    ],
    contaController.createContaReceber
);

router.put(
    '/:id',
    authenticateJWT,
    [
        body('Descricao').notEmpty().withMessage('Descrição é obrigatória'),
        body('DataLancamento').notEmpty().withMessage('Data de lançamento é obrigatória'),
        body('Valor').isDecimal().withMessage('Valor deve ser um número'),
        body('Status').notEmpty().withMessage('Status é obrigatório'),
    ],
    contaController.updateContaReceber
);

router.delete('/:id', authenticateJWT, contaController.deleteContaReceber);

module.exports = router;
