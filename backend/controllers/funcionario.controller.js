const Funcionario = require('../models/funcionario.model');

exports.getAllFuncionario = async (req, res) => {
    try {
        const rows = await Funcionario.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar funcionários", error: error.message });
    }
};

exports.getFuncionarioById = async (req, res) => {
    try {
        const funcionario = await Funcionario.getById(req.params.id);
        if (!funcionario) return res.status(404).json({ message: "Funcionário não encontrado" });
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar funcionário", error: error.message });
    }
};

exports.createFuncionario = async (req, res) => {
    const { Nome, Cargo, DataContratacao, Salario } = req.body;
    if (!Nome || !Cargo) return res.status(400).json({ message: "Nome e Cargo são obrigatórios" });

    try {
        const result = await Funcionario.create({ Nome, Cargo, DataContratacao, Salario });
        res.status(201).json({ message: "Funcionário criado com sucesso", id: result.id });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar funcionário", error: error.message });
    }
};

exports.updateFuncionario = async (req, res) => {
    const { Nome, Cargo, DataContratacao, Salario } = req.body;
    try {
        const result = await Funcionario.update({ Nome, Cargo, DataContratacao, Salario, ID: req.params.id });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Funcionário não encontrado" });
        res.status(200).json({ message: "Funcionário atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar funcionário", error: error.message });
    }
};

exports.deleteFuncionario = async (req, res) => {
    try {
        const result = await Funcionario.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Funcionário não encontrado" });
        res.status(200).json({ message: "Funcionário removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover funcionário", error: error.message });
    }
};
