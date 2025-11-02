const db = require('../config/db.config');
const { validationResult } = require('express-validator');

// GET /clientes
exports.getAllClientes = async (req, res, next) => {
    try {
        const [rows] = await db.query("SELECT * FROM Cliente WHERE Removido = FALSE");
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

// GET /clientes/:id
exports.getClienteById = async (req, res, next) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM Cliente WHERE ID = ? AND Removido = FALSE",
            [req.params.id]
        );
        if (rows.length === 0)
            return res.status(404).json({ success: false, message: "Cliente não encontrado" });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

// POST /clientes
exports.createCliente = async (req, res, next) => {
    try {
        // Validação do express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Nome, Telefone, Email } = req.body;
        const [result] = await db.query(
            "INSERT INTO Cliente (Nome, Telefone, Email, DataCadastro) VALUES (?, ?, ?, CURDATE())",
            [Nome, Telefone, Email]
        );
        res.status(201).json({
            success: true,
            message: "Cliente criado com sucesso",
            data: { id: result.insertId, Nome, Telefone, Email }
        });
    } catch (error) {
        next(error);
    }
};

// PUT /clientes/:id
exports.updateCliente = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Nome, Telefone, Email } = req.body;
        const [result] = await db.query(
            "UPDATE Cliente SET Nome = ?, Telefone = ?, Email = ? WHERE ID = ? AND Removido = FALSE",
            [Nome, Telefone, Email, ID]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ success: false, message: "Cliente não encontrado" });

        res.json({ success: true, message: "Cliente atualizado com sucesso" });
    } catch (error) {
        next(error);
    }
};

// DELETE /clientes/:id
exports.deleteCliente = async (req, res, next) => {
    try {
        const [result] = await db.query("UPDATE Cliente SET Removido = TRUE WHERE ID = ?", [req.params.id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ success: false, message: "Cliente não encontrado" });

        res.json({ success: true, message: "Cliente removido com sucesso" });
    } catch (error) {
        next(error);
    }
};
