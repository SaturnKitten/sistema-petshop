const Funcionario = require('../models/funcionario.model');

const getAllFuncionarios = async (req, res, next) => {
    try {
        const rows = await Funcionario.getAll();
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

const getFuncionarioById = async (req, res, next) => {
    try {
        const funcionario = await Funcionario.getById(req.params.id);
        if (!funcionario) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
        res.status(200).json({ success: true, data: funcionario });
    } catch (error) {
        next(error);
    }
};

const createFuncionario = async (req, res, next) => {
    const { Nome, Cargo, DataContratacao, Salario } = req.body;
    if (!Nome || !Cargo) return res.status(400).json({ success: false, message: "Nome e Cargo são obrigatórios" });

    try {
        const result = await Funcionario.create({ Nome, Cargo, DataContratacao, Salario });
        res.status(201).json({ success: true, message: "Funcionário criado com sucesso", data: { id: result.id } });
    } catch (error) {
        next(error);
    }
};

const updateFuncionario = async (req, res, next) => {
    const { Nome, Cargo, DataContratacao, Salario } = req.body;
    try {
        const result = await Funcionario.update({ Nome, Cargo, DataContratacao, Salario, ID: req.params.id });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
        res.status(200).json({ success: true, message: "Funcionário atualizado com sucesso" });
    } catch (error) {
        next(error);
    }
};

const deleteFuncionario = async (req, res, next) => {
    try {
        const result = await Funcionario.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
        res.status(200).json({ success: true, message: "Funcionário removido com sucesso" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllFuncionarios,
    getFuncionarioById,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario
};
