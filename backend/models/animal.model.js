const pool = require('../config/db.config'); // aqui usamos Pool do pg

const Animal = {
    getAll: async () => {
        const res = await pool.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.Removido = FALSE AND c.Removido = FALSE
        `);
        return res.rows; // .rows é o padrão do pg
    },

    getById: async (id) => {
        const res = await pool.query(`
            SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, c.Nome AS NomeCliente
            FROM Animal a
            JOIN Cliente c ON a.ID_Cliente = c.ID
            WHERE a.ID = $1 AND a.Removido = FALSE
        `, [id]); // no PostgreSQL usamos $1, $2 ... como placeholders
        return res.rows[0];
    },

    create: async ({ Nome, Especie, Raca, DataNascimento, ID_Cliente }) => {
        const res = await pool.query(`
            INSERT INTO Animal (Nome, Especie, Raca, DataNascimento, ID_Cliente)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING ID
        `, [Nome, Especie, Raca, DataNascimento, ID_Cliente]);
        return { id: res.rows[0].id }; // retornar o id criado
    },

    update: async ({ Nome, Especie, Raca, DataNascimento, ID_Cliente, ID }) => {
        const res = await pool.query(`
            UPDATE Animal
            SET Nome = $1, Especie = $2, Raca = $3, DataNascimento = $4, ID_Cliente = $5
            WHERE ID = $6 AND Removido = FALSE
        `, [Nome, Especie, Raca, DataNascimento, ID_Cliente, ID]);
        return res;
    },

    delete: async (ID) => {
        const res = await pool.query(`
            UPDATE Animal SET Removido = TRUE WHERE ID = $1
        `, [ID]);
        return res;
    }
};

module.exports = Animal;
