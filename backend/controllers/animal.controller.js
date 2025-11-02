const Cliente = require('../models/cliente.model');
const { validationResult } = require('express-validator');

const getAllClientes = async (req, res, next) => {
    try {
        const rows = await Cliente.getAll();
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

const getClienteById = async (req, res, next) => {
    try {
        const cliente = await Cliente.getById(req.params.id);
        if (!cliente) return res.status(404).json({ success: false, message: "Cliente não encontrado" });
        res.status(200).json({ success: true, data: cliente });
    } catch (error) {
        next(error);
    }
};

const createCliente = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Nome, Telefone, Email } = req.body;
        const result = await Cliente.create({ Nome, Telefone, Email });
        res.status(201).json({ success: true, message: "Cliente criado com sucesso", data: { id: result.id } });
    } catch (error) {
        next(error);
    }
};

const updateCliente = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Nome, Telefone, Email } = req.body;
        const result = await Cliente.update({ ID: req.params.id, Nome, Telefone, Email });
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Cliente não encontrado" });
        res.status(200).json({ success: true, message: "Cliente atualizado com sucesso" });
    } catch (error) {
        next(error);
    }
};

const deleteCliente = async (req, res, next) => {
    try {
        const result = await Cliente.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Cliente não encontrado" });
        res.status(200).json({ success: true, message: "Cliente removido com sucesso" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
