const db = require('../config/db.config');

const Animal = {
    getAll: async () => {
        return db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, a.ID_Cliente, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.Removido = FALSE AND c.Removido = FALSE
            ORDER BY a.Nome
        `);
    },

    getById: async (id) => {
        return db.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, a.ID_Cliente, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.ID = $1 AND a.Removido = FALSE
        `, [id]);
    },

    create: async ({ Nome, Especie, Raca, DataNascimento, ID_Cliente }) => {
        return db.query(
            "INSERT INTO Animal (Nome, Especie, Raca, DataNascimento, ID_Cliente) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [Nome, Especie, Raca, DataNascimento, ID_Cliente]
        );
    },

    update: async ({ ID, Nome, Especie, Raca, DataNascimento, ID_Cliente }) => {
        return db.query(
            "UPDATE Animal SET Nome = $1, Especie = $2, Raca = $3, DataNascimento = $4, ID_Cliente = $5 WHERE ID = $6 AND Removido = FALSE RETURNING *",
            [Nome, Especie, Raca, DataNascimento, ID_Cliente, ID]
        );
    },

    delete: async (ID) => {
        return db.query("UPDATE Animal SET Removido = TRUE WHERE ID = $1 RETURNING *", [ID]);
    }
};

module.exports = Animal;
