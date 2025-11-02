const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animal.controller');
const authenticateJWT = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

router.get('/', authenticateJWT, animalController.getAllAnimals);
router.get('/:id', authenticateJWT, animalController.getAnimalById);

router.post(
    '/',
    authenticateJWT,
    [
        body('Nome').notEmpty().withMessage('Nome é obrigatório'),
        body('Especie').notEmpty().withMessage('Espécie é obrigatória'),
        body('DataNascimento').notEmpty().withMessage('Data de nascimento é obrigatória'),
        body('ID_Cliente').isInt().withMessage('ID do cliente deve ser um número'),
    ],
    animalController.createAnimal
);

router.put(
    '/:id',
    authenticateJWT,
    [
        body('Nome').notEmpty().withMessage('Nome é obrigatório'),
        body('Especie').notEmpty().withMessage('Espécie é obrigatória'),
        body('DataNascimento').notEmpty().withMessage('Data de nascimento é obrigatória'),
        body('ID_Cliente').isInt().withMessage('ID do cliente deve ser um número'),
    ],
    animalController.updateAnimal
);

router.delete('/:id', authenticateJWT, animalController.deleteAnimal);

module.exports = router;
