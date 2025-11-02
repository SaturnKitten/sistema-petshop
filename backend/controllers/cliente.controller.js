const Cliente = require('../models/cliente.model');

exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        res.status(200).json({ success: true, data: clientes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar clientes', error: error.message });
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.getById(req.params.id);
        if (!cliente) return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
        res.status(200).json({ success: true, data: cliente });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar cliente', error: error.message });
    }
};

exports.createCliente = async (req, res) => {
    const { Nome, Telefone, Email } = req.body;
    try {
        const result = await Cliente.create({ Nome, Telefone, Email });
        res.status(201).json({ success: true, message: 'Cliente criado com sucesso', data: { id: result.id } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao criar cliente', error: error.message });
    }
};

exports.updateCliente = async (req, res) => {
    const { Nome, Telefone, Email } = req.body;
    try {
        const result = await Cliente.update({ ID: req.params.id, Nome, Telefone, Email });
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
        res.status(200).json({ success: true, message: 'Cliente atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar cliente', error: error.message });
    }
};

exports.deleteCliente = async (req, res) => {
    try {
        const result = await Cliente.delete(req.params.id);
        if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
        res.status(200).json({ success: true, message: 'Cliente removido com sucesso' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao remover cliente', error: error.message });
    }
};
