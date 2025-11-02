const Funcionario = require('../models/funcionario.model');

exports.getAllFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.getAll();
        res.status(200).json({ success: true, data: funcionarios });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar funcionários', error: error.message });
    }
};

exports.getFuncionarioById = async (req, res) => {
    try {
        const funcionario = await Funcionario.getById(req.params.id);
        if (!funcionario) return res.status(404).json({ success: false, message: 'Funcionário não encontrado' });
        res.status(200).json({ success: true, data: funcionario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar funcionário', error: error.message });
    }
};

exports.createFuncionario = async (req, res) => {
    const { Nome, Cargo, DataContratacao, Salario } = req.body;
    try {
        const result = await Funcionario.create({ Nome, Cargo, DataContratacao, Salario });
        res.status(201).json({ success: true, message: 'Funcionário criado com sucesso', data: { id: result.id } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao criar funcionário', error: error.message });
    }
};

exports.updateFuncionario = async (req, res) => {
    const { Nome, Cargo, DataContratacao, Salario } = req.body;
    try {
        const result = await Funcionario.update({ ID: req.params.id, Nome, Cargo, DataContratacao, Salario });
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Funcionário não encontrado' });
        res.status(200).json({ success: true, message: 'Funcionário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar funcionário', error: error.message });
    }
};

exports.deleteFuncionario = async (req, res) => {
    try {
        const result = await Funcionario.delete(req.params.id);
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Funcionário não encontrado' });
        res.status(200).json({ success: true, message: 'Funcionário removido com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao remover funcionário', error: error.message });
    }
};
