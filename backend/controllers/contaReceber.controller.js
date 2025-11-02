const ContaReceber = require('../models/contaReceber.model');
const { validationResult } = require('express-validator');

const getAllContasReceber = async (req, res, next) => {
    try {
        const rows = await ContaReceber.getAll();
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

const getContaReceberById = async (req, res, next) => {
    try {
        const conta = await ContaReceber.getById(req.params.id);
        if (!conta) return res.status(404).json({ success: false, message: "Conta não encontrada" });
        res.status(200).json({ success: true, data: conta });
    } catch (error) {
        next(error);
    }
};

const createContaReceber = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, DataLancamento, Valor, ID_Cliente } = req.body;
        const result = await ContaReceber.create({ Descricao, DataLancamento, Valor, ID_Cliente });
        res.status(201).json({ success: true, message: "Conta criada com sucesso", data: { id: result.id } });
    } catch (error) {
        next(error);
    }
};

const updateContaReceber = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, DataLancamento, Valor, Status } = req.body;
        const result = await ContaReceber.update({ ID: req.params.id, Descricao, DataLancamento, Valor, Status });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Conta não encontrada" });
        res.status(200).json({ success: true, message: "Conta atualizada com sucesso" });
    } catch (error) {
        next(error);
    }
};

const deleteContaReceber = async (req, res, next) => {
    try {
        const result = await ContaReceber.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Conta não encontrada" });
        res.status(200).json({ success: true, message: "Conta removida com sucesso" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllContasReceber,
    getContaReceberById,
    createContaReceber,
    updateContaReceber,
    deleteContaReceber
};
