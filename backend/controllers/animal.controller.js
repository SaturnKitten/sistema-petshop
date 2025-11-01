const db = require('../config/db.config');

exports.getAllAnimals = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.Removido = FALSE AND c.Removido = FALSE
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAnimalById = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.ID = ? AND a.Removido = FALSE
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Animal não encontrado" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAnimal = async (req, res) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO Animal (Nome, Especie, Raca, DataNascimento, ID_Cliente) VALUES (?, ?, ?, ?, ?)",
            [Nome, Especie, Raca, DataNascimento, ID_Cliente]
        );
        res.status(201).json({ id: result.insertId, Nome, Especie, Raca, DataNascimento, ID_Cliente });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAnimal = async (req, res) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    try {
        const [result] = await db.query(
            "UPDATE Animal SET Nome = ?, Especie = ?, Raca = ?, DataNascimento = ?, ID_Cliente = ? WHERE ID = ? AND Removido = FALSE",
            [Nome, Especie, Raca, DataNascimento, ID_Cliente, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Animal não encontrado" });
        res.json({ message: "Animal atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAnimal = async (req, res) => {
    try {
        const [result] = await db.query("UPDATE Animal SET Removido = TRUE WHERE ID = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Animal não encontrado" });
        res.json({ message: "Animal removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};