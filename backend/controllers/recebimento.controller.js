const Recebimento = require('../models/recebimento.model');

exports.getAllRecebimentos = async (req, res) => {
    try {
        const rows = await Recebimento.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar recebimentos", error: error.message });
    }
};

exports.getRecebimentoById = async (req, res) => {
    try {
        const recebimento = await Recebimento.getById(req.params.id);
        if (!recebimento) return res.status(404).json({ message: "Recebimento não encontrado" });
        res.status(200).json(recebimento);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar recebimento", error: error.message });
    }
};

exports.createRecebimento = async (req, res) => {
    const { Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
    if (!Descricao || !ID_ContaReceber || !ValorRecebido)
        return res.status(400).json({ message: "Descrição, ID_ContaReceber e ValorRecebido são obrigatórios" });

    try {
        const result = await Recebimento.create({ Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento });
        res.status(201).json({ message: "Recebimento criado com sucesso", id: result.id });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar recebimento", error: error.message });
    }
};

exports.updateRecebimento = async (req, res) => {
    const { Descricao, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
    try {
        const result = await Recebimento.update({ Descricao, DataRecebimento, ValorRecebido, MetodoPagamento, ID: req.params.id });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Recebimento não encontrado" });
        res.status(200).json({ message: "Recebimento atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar recebimento", error: error.message });
    }
};

exports.deleteRecebimento = async (req, res) => {
    try {
        const result = await Recebimento.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Recebimento não encontrado" });
        res.status(200).json({ message: "Recebimento removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover recebimento", error: error.message });
    }
};
