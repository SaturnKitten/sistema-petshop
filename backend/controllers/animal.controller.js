const db = require('../config/db.config');

exports.getAllAnimals = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.Removido = FALSE AND c.Removido = FALSE
        `);
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

exports.getAnimalById = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.ID = ? AND a.Removido = FALSE
        `, [req.params.id]);
        if (rows.length === 0)
            return res.status(404).json({ success: false, message: "Animal não encontrado" });

        res.json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

exports.createAnimal = async (req, res, next) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    if (!Nome || !Especie || !DataNascimento || !ID_Cliente)
        return res.status(400).json({ success: false, message: "Campos obrigatórios faltando" });

    try {
        const [result] = await db.query(
            "INSERT INTO Animal (Nome, Especie, Raca, DataNascimento, ID_Cliente) VALUES (?, ?, ?, ?, ?)",
            [Nome, Especie, Raca, DataNascimento, ID_Cliente]
        );
        res.status(201).json({
            success: true,
            message: "Animal cadastrado com sucesso",
            data: { id: result.insertId, Nome, Especie, Raca, DataNascimento, ID_Cliente }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateAnimal = async (req, res, next) => {
    const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
    try {
        const [result] = await db.query(
            "UPDATE Animal SET Nome = ?, Especie = ?, Raca = ?, DataNascimento = ?, ID_Cliente = ? WHERE ID = ? AND Removido = FALSE",
            [Nome, Especie, Raca, DataNascimento, ID_Cliente, req.params.id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ success: false, message: "Animal não encontrado" });

        res.json({ success: true, message: "Animal atualizado com sucesso" });
    } catch (error) {
        next(error);
    }
};

exports.deleteAnimal = async (req, res, next) => {
    try {
        const [result] = await db.query("UPDATE Animal SET Removido = TRUE WHERE ID = ?", [req.params.id]);
        if (result.affectedRows === 0)
            return res.status(404).json({ success: false, message: "Animal não encontrado" });

        res.json({ success: true, message: "Animal removido com sucesso" });
    } catch (error) {
        next(error);
    }
};
