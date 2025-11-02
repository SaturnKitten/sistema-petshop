const db = require('../config/db.config');
const { validationResult } = require('express-validator');

// GET /funcionarios
exports.getAllFuncionarios = async (req, res, next) => {
    try {
        const [rows] = await db.query("SELECT * FROM Funcionario WHERE Removido = FALSE");
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

// GET /funcionarios/:id
exports.getFuncionarioById = async (req, res, next) => {
    try {
        const [rows] = await db.query("SELECT * FROM Funcionario WHERE ID = ? AND Removido = FALSE", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

// POST /funcionarios
exports.createFuncionario = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Nome, Cargo, DataContratacao, Salario } = req.body;
        const [result] = await db.query(
            "INSERT INTO Funcionario (Nome, Cargo, DataContratacao, Salario) VALUES (?, ?, ?, ?)",
            [Nome, Cargo, DataContratacao, Salario]
        );
        res.status(201).json({
            success: true,
            message: "Funcionário criado com sucesso",
            data: { id: result.insertId, Nome, Cargo, DataContratacao, Salario }
        });
    } catch (error) {
        next(error);
    }
};

// PUT /funcionarios/:id
exports.updateFuncionario = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

        const { Nome, Cargo, DataContratacao, Salario } = req.body;
        const [result] = await db.query(
            "UPDATE Funcionario SET Nome = ?, Cargo = ?, DataContratacao = ?, Salario = ? WHERE ID = ? AND Removido = FALSE",
            [Nome, Cargo, DataContratacao, Salario, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
        res.json({ success: true, message: "Funcionário atualizado com sucesso" });
    } catch (error) {
        next(error);
    }
};

// DELETE /funcionarios/:id
exports.deleteFuncionario = async (req, res, next) => {
    try {
        const [result] = await db.query("UPDATE Funcionario SET Removido = TRUE WHERE ID = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
        res.json({ success: true, message: "Funcionário removido com sucesso" });
    } catch (error) {
        next(error);
    }
};
