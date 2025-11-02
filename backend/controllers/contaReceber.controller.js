const ContaReceber = require('../models/contaReceber.model');

exports.getAllContasReceber = async (req, res) => {
    try {
        const contas = await ContaReceber.getAll();
        res.status(200).json({ success: true, data: contas });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar contas a receber', error: error.message });
    }
};

exports.getContaReceberById = async (req, res) => {
    try {
        const conta = await ContaReceber.getById(req.params.id);
        if (!conta) return res.status(404).json({ success: false, message: 'Conta não encontrada' });
        res.status(200).json({ success: true, data: conta });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar conta', error: error.message });
    }
};

exports.createContaReceber = async (req, res) => {
    const { Descricao, DataLancamento, Valor, ID_Cliente } = req.body;
    try {
        const result = await ContaReceber.create({ Descricao, DataLancamento, Valor, ID_Cliente });
        res.status(201).json({ success: true, message: 'Conta criada com sucesso', data: { id: result.id } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao criar conta', error: error.message });
    }
};

exports.updateContaReceber = async (req, res) => {
    const { Descricao, DataLancamento, Valor, Status } = req.body;
    try {
        const result = await ContaReceber.update({ ID: req.params.id, Descricao, DataLancamento, Valor, Status });
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Conta não encontrada' });
        res.status(200).json({ success: true, message: 'Conta atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar conta', error: error.message });
    }
};

exports.deleteContaReceber = async (req, res) => {
    try {
        const result = await ContaReceber.delete(req.params.id);
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Conta não encontrada' });
        res.status(200).json({ success: true, message: 'Conta removida com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao remover conta', error: error.message });
    }
};
