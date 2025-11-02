const Animal = require('../models/animal.model');

exports.getAllAnimals = async (req, res) => {
    try {
        const rows = await Animal.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar animais", error: error.message });
    }
};

exports.getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.getById(req.params.id);
        if (!animal) return res.status(404).json({ message: "Animal não encontrado" });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar animal", error: error.message });
    }
};

exports.createAnimal = async (req, res) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    if (!Nome || !Especie || !ID_Cliente)
        return res.status(400).json({ message: "Nome, Espécie e ID_Cliente são obrigatórios" });

    try {
        const result = await Animal.create({ Nome, Especie, Raca, DataNascimento, ID_Cliente });
        res.status(201).json({ message: "Animal criado com sucesso", id: result.id });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar animal", error: error.message });
    }
};

exports.updateAnimal = async (req, res) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    if (!Nome || !Especie)
        return res.status(400).json({ message: "Nome e Espécie são obrigatórios" });

    try {
        const result = await Animal.update({ Nome, Especie, Raca, DataNascimento, ID_Cliente, ID: req.params.id });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Animal não encontrado" });
        res.status(200).json({ message: "Animal atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar animal", error: error.message });
    }
};

exports.deleteAnimal = async (req, res) => {
    try {
        const result = await Animal.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Animal não encontrado" });
        res.status(200).json({ message: "Animal removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover animal", error: error.message });
    }
};
