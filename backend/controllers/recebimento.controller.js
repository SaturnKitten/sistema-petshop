const Recebimento = require('../models/recebimento.model');
const { validationResult } = require('express-validator');

const getAllRecebimentos = async (req, res, next) => {
    try {
        const rows = await Recebimento.getAll();
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

const getRecebimentoById = async (req, res, next) => {
    try {
        const rec = await Recebimento.getById(req.params.id);
        if (!rec) return res.status(404).json({ success: false, message: "Recebimento não encontrado" });
        res.status(200).json({ success: true, data: rec });
    } catch (error) {
        next(error);
    }
};

const createRecebimento = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
        const result = await Recebimento.create({ Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento });
        res.status(201).json({ success: true, message: "Recebimento criado com sucesso", data: { id: result.id } });
    } catch (error) {
        next(error);
    }
};

const updateRecebimento = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
        const result = await Recebimento.update({ ID: req.params.id, Descricao, DataRecebimento, ValorRecebido, MetodoPagamento });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Recebimento não encontrado" });
        res.status(200).json({ success: true, message: "Recebimento atualizado com sucesso" });
    } catch (error) {
        next(error);
    }
};

const deleteRecebimento = async (req, res, next) => {
    try {
        const result = await Recebimento.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Recebimento não encontrado" });
        res.status(200).json({ success: true, message: "Recebimento removido com sucesso" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllRecebimentos,
    getRecebimentoById,
    createRecebimento,
    updateRecebimento,
    deleteRecebimento
};
