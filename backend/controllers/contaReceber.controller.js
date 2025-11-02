const db = require('../config/db.config');
const { validationResult } = require('express-validator');

// GET /contasReceber
exports.getAllContasReceber = async (req, res, next) => {
    try {
        const [rows] = await db.query(
            `SELECT cr.*, c.Nome AS NomeCliente
             FROM ContaReceber cr
             JOIN Cliente c ON cr.ID_Cliente = c.ID
             WHERE cr.Removido = FALSE AND c.Removido = FALSE`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

// GET /contasReceber/:id
exports.getContaReceberById = async (req, res, next) => {
    try {
        const [rows] = await db.query(
            `SELECT cr.*, c.Nome AS NomeCliente
             FROM ContaReceber cr
             JOIN Cliente c ON cr.ID_Cliente = c.ID
             WHERE cr.ID = ? AND cr.Removido = FALSE`,
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Conta não encontrada" });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

// POST /contasReceber
exports.createContaReceber = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, DataLancamento, Valor, ID_Cliente } = req.body;
        const [result] = await db.query(
            `INSERT INTO ContaReceber (Descricao, DataLancamento, Valor, Status, ID_Cliente)
             VALUES (?, ?, ?, 'PENDENTE', ?)`,
            [Descricao, DataLancamento, Valor, ID_Cliente]
        );
        res.status(201).json({
            success: true,
            message: "Conta criada com sucesso",
            data: { id: result.insertId, Descricao, DataLancamento, Valor, Status: 'PENDENTE', ID_Cliente }
        });
    } catch (error) {
        next(error);
    }
};

// PUT /contasReceber/:id
exports.updateContaReceber = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Descricao, DataLancamento, Valor, Status } = req.body;
        const [result] = await db.query(
            `UPDATE ContaReceber SET Descricao = ?, DataLancamento = ?, Valor = ?, Status = ?
             WHERE ID = ? AND Removido = FALSE`,
            [Descricao, DataLancamento, Valor, Status, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Conta não encontrada" });
        res.json({ success: true, message: "Conta atualizada com sucesso" });
    } catch (error) {
        next(error);
    }
};

// DELETE /contasReceber/:id
exports.deleteContaReceber = async (req, res, next) => {
    try {
        const [result] = await db.query("UPDATE ContaReceber SET Removido = TRUE WHERE ID = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Conta não encontrada" });
        res.json({ success: true, message: "Conta removida com sucesso" });
    } catch (error) {
        next(error);
    }
};
