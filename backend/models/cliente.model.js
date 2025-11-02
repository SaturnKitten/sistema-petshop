const pool = require('../config/db.config');

const Cliente = {
    getAll: async () => {
        const res = await pool.query(`
            SELECT * FROM Cliente WHERE Removido = FALSE
        `);
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query(`
            SELECT * FROM Cliente WHERE ID = $1 AND Removido = FALSE
        `, [id]);
        return res.rows[0];
    },

    create: async ({ Nome, Telefone, Email }) => {
        const res = await pool.query(`
            INSERT INTO Cliente (Nome, Telefone, Email, DataCadastro)
            VALUES ($1, $2, $3, CURRENT_DATE)
            RETURNING ID
        `, [Nome, Telefone, Email]);
        return { id: res.rows[0].id };
    },

    update: async ({ ID, Nome, Telefone, Email }) => {
        const res = await pool.query(`
            UPDATE Cliente
            SET Nome = $1, Telefone = $2, Email = $3
            WHERE ID = $4 AND Removido = FALSE
        `, [Nome, Telefone, Email, ID]);
        return res;
    },

    delete: async (ID) => {
        const res = await pool.query(`
            UPDATE Cliente SET Removido = TRUE WHERE ID = $1
        `, [ID]);
        return res;
    }
};

module.exports = Cliente;
