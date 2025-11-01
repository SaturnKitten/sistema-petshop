const db = require('../config/db.config');

exports.getAllClientes = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Cliente WHERE Removido = FALSE");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Cliente WHERE ID = ? AND Removido = FALSE", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCliente = async (req, res) => {
    const { Nome, Telefone, Email } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO Cliente (Nome, Telefone, Email, DataCadastro) VALUES (?, ?, ?, CURDATE())",
            [Nome, Telefone, Email]
        );
        res.status(201).json({ id: result.insertId, Nome, Telefone, Email });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCliente = async (req, res) => {
    const { Nome, Telefone, Email } = req.body;
    try {
        const [result] = await db.query(
            "UPDATE Cliente SET Nome = ?, Telefone = ?, Email = ? WHERE ID = ? AND Removido = FALSE",
            [Nome, Telefone, Email, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json({ message: "Cliente atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCliente = async (req, res) => {
    try {
        const [result] = await db.query("UPDATE Cliente SET Removido = TRUE WHERE ID = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json({ message: "Cliente removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};