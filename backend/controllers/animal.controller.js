const Animal = require('../models/animal.model');

exports.getAllAnimais = async (req, res) => {
    try {
        const animais = await Animal.getAll();
        res.status(200).json({ success: true, data: animais });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar animais', error: error.message });
    }
};

exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.getById(req.params.id);
        if (!animal) return res.status(404).json({ success: false, message: 'Animal não encontrado' });
        res.status(200).json({ success: true, data: animal });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar animal', error: error.message });
    }
};

exports.createAnimal = async (req, res) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    try {
        const result = await Animal.create({ Nome, Especie, Raca, DataNascimento, ID_Cliente });
        res.status(201).json({ success: true, message: 'Animal criado com sucesso', data: { id: result.id } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao criar animal', error: error.message });
    }
};

exports.updateAnimal = async (req, res) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    try {
        const result = await Animal.update({ ID: req.params.id, Nome, Especie, Raca, DataNascimento, ID_Cliente });
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Animal não encontrado' });
        res.status(200).json({ success: true, message: 'Animal atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar animal', error: error.message });
    }
};

exports.deleteAnimal = async (req, res) => {
    try {
        const result = await Animal.delete(req.params.id);
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Animal não encontrado' });
        res.status(200).json({ success: true, message: 'Animal removido com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao remover animal', error: error.message });
    }
};
