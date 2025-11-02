const Recebimento = require('../models/recebimento.model');

exports.getAllRecebimentos = async (req, res) => {
    try {
        const recebimentos = await Recebimento.getAll();
        res.status(200).json({ success: true, data: recebimentos });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar recebimentos', error: error.message });
    }
};

exports.getRecebimentoById = async (req, res) => {
    try {
        const recebimento = await Recebimento.getById(req.params.id);
        if (!recebimento) return res.status(404).json({ success: false, message: 'Recebimento não encontrado' });
        res.status(200).json({ success: true, data: recebimento });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar recebimento', error: error.message });
    }
};

exports.createRecebimento = async (req, res) => {
    const { Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
    try {
        const result = await Recebimento.create({ Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento });
        res.status(201).json({ success: true, message: 'Recebimento criado com sucesso', data: { id: result.id } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao criar recebimento', error: error.message });
    }
};

exports.updateRecebimento = async (req, res) => {
    const { Descricao, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
    try {
        const result = await Recebimento.update({ ID: req.params.id, Descricao, DataRecebimento, ValorRecebido, MetodoPagamento });
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Recebimento não encontrado' });
        res.status(200).json({ success: true, message: 'Recebimento atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar recebimento', error: error.message });
    }
};

exports.deleteRecebimento = async (req, res) => {
    try {
        const result = await Recebimento.delete(req.params.id);
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Recebimento não encontrado' });
        res.status(200).json({ success: true, message: 'Recebimento removido com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao remover recebimento', error: error.message });
    }
};
