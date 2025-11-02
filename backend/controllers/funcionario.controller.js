const db = require('../config/db.config');
const { validationResult } = require('express-validator');

// GET /recebimentos
exports.getAllRecebimentos = async (req, res, next) => {
    try {
        const [rows] = await db.query(
            `SELECT r.*, cr.Descricao AS ContaDescricao
             FROM Recebimento r
             JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
             WHERE r.Removido = FALSE AND cr.Removido = FALSE`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

// GET /recebimentos/:id
exports.getRecebimentoById = async (req, res, next) => {
    try {
        const [rows] = await db.query(
            `SELECT r.*, cr.Descricao AS ContaDescricao
             FROM Recebimento r
             JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
             WHERE r.ID = ? AND r.Removido = FALSE`,
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Recebimento não encontrado" });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

// POST /recebimentos
exports.createRecebimento = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
        const [result] = await db.query(
            `INSERT INTO Recebimento (Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento)
             VALUES (?, ?, ?, ?, ?)`,
            [Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento]
        );
        res.status(201).json({
            success: true,
            message: "Recebimento criado com sucesso",
            data: { id: result.insertId, Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento }
        });
    } catch (error) {
        next(error);
    }
};

// PUT /recebimentos/:id
exports.updateRecebimento = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
        const [result] = await db.query(
            `UPDATE Recebimento SET Descricao = ?, DataRecebimento = ?, ValorRecebido = ?, MetodoPagamento = ?
             WHERE ID = ? AND Removido = FALSE`,
            [Descricao, DataRecebimento, ValorRecebido, MetodoPagamento, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Recebimento não encontrado" });
        res.json({ success: true, message: "Recebimento atualizado com sucesso" });
    } catch (error) {
        next(error);
    }
};

// DELETE /recebimentos/:id
exports.deleteRecebimento = async (req, res, next) => {
    try {
        const [result] = await db.query("UPDATE Recebimento SET Removido = TRUE WHERE ID = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Recebimento não encontrado" });
        res.json({ success: true, message: "Recebimento removido com sucesso" });
    } catch (error) {
        next(error);
    }
};
