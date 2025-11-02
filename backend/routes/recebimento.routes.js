const express = require('express');
const router = express.Router();
const recebimentoController = require('../controllers/recebimento.controller');
const authenticateJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

router.get('/', authenticateJWT, recebimentoController.getAllRecebimentos);
router.get('/:id', authenticateJWT, recebimentoController.getRecebimentoById);

router.post(
    '/',
    authenticateJWT,
    [
        body('Descricao').notEmpty().withMessage('Descrição é obrigatória'),
        body('ID_ContaReceber').isInt().withMessage('ID da conta a receber deve ser um número'),
        body('DataRecebimento').notEmpty().withMessage('Data do recebimento é obrigatória'),
        body('ValorRecebido').isDecimal().withMessage('Valor recebido deve ser um número'),
    ],
    recebimentoController.createRecebimento
);

router.put(
    '/:id',
    authenticateJWT,
    [
        body('Descricao').notEmpty().withMessage('Descrição é obrigatória'),
        body('DataRecebimento').notEmpty().withMessage('Data do recebimento é obrigatória'),
        body('ValorRecebido').isDecimal().withMessage('Valor recebido deve ser um número'),
    ],
    recebimentoController.updateRecebimento
);

router.delete('/:id', authenticateJWT, recebimentoController.deleteRecebimento);

module.exports = router;
