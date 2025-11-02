const Cliente = require('../models/cliente.model');

exports.getAllClientes = async (req, res) => {
    try {
        const [rows] = await Cliente.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes", error: error.message });
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const [rows] = await Cliente.getById(req.params.id);
        if (rows.length === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar cliente", error: error.message });
    }
};

exports.createCliente = async (req, res) => {
    const { Nome, Telefone, Email } = req.body;
    if (!Nome) return res.status(400).json({ message: "Nome é obrigatório" });

    try {
        const [result] = await Cliente.create({ Nome, Telefone, Email });
        res.status(201).json({ message: "Cliente criado com sucesso", id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar cliente", error: error.message });
    }
};

exports.updateCliente = async (req, res) => {
    const { Nome, Telefone, Email } = req.body;
    if (!Nome) return res.status(400).json({ message: "Nome é obrigatório" });

    try {
        const [result] = await Cliente.update({ Nome, Telefone, Email, ID: req.params.id });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.status(200).json({ message: "Cliente atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar cliente", error: error.message });
    }
};

exports.deleteCliente = async (req, res) => {
    try {
        const [result] = await Cliente.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.status(200).json({ message: "Cliente removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover cliente", error: error.message });
    }
};
