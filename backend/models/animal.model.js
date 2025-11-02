const db = require('../config/db.config');

const Animal = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.Removido = FALSE AND c.Removido = FALSE
        `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.ID = ? AND a.Removido = FALSE
        `, [id]);
        return rows[0];
    },

    create: async ({ Nome, Especie, Raca, DataNascimento, ID_Cliente }) => {
        const [result] = await db.query(`
            INSERT INTO Animal (Nome, Especie, Raca, DataNascimento, ID_Cliente)
            VALUES (?, ?, ?, ?, ?)
        `, [Nome, Especie, Raca, DataNascimento, ID_Cliente]);
        return { id: result.insertId };
    },

    update: async ({ Nome, Especie, Raca, DataNascimento, ID_Cliente, ID }) => {
        const [result] = await db.query(`
            UPDATE Animal
            SET Nome = ?, Especie = ?, Raca = ?, DataNascimento = ?, ID_Cliente = ?
            WHERE ID = ? AND Removido = FALSE
        `, [Nome, Especie, Raca, DataNascimento, ID_Cliente, ID]);
        return result;
    },

    delete: async (ID) => {
        const [result] = await db.query("UPDATE Animal SET Removido = TRUE WHERE ID = ?", [ID]);
        return result;
    }
};

module.exports = Animal;
