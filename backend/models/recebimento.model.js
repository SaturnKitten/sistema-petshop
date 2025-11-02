const pool = require('../config/db.config');

const Recebimento = {
    getAll: async () => {
        const res = await pool.query(`
            SELECT r.*, cr.Descricao AS ContaDescricao
            FROM Recebimento r
            JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
            WHERE r.Removido = FALSE AND cr.Removido = FALSE
        `);
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query(`
            SELECT r.*, cr.Descricao AS ContaDescricao
            FROM Recebimento r
            JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
            WHERE r.ID = $1 AND r.Removido = FALSE
        `, [id]);
        return res.rows[0];
    },

    create: async ({ Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento }) => {
        const res = await pool.query(`
            INSERT INTO Recebimento (Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING ID
        `, [Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento]);
        return { id: res.rows[0].id };
    },

    update: async ({ ID, Descricao, DataRecebimento, ValorRecebido, MetodoPagamento }) => {
        const res = await pool.query(`
            UPDATE Recebimento
            SET Descricao = $1, DataRecebimento = $2, ValorRecebido = $3, MetodoPagamento = $4
            WHERE ID = $5 AND Removido = FALSE
        `, [Descricao, DataRecebimento, ValorRecebido, MetodoPagamento, ID]);
        return res;
    },

    delete: async (ID) => {
        const res = await pool.query(`
            UPDATE Recebimento SET Removido = TRUE WHERE ID = $1
        `, [ID]);
        return res;
    }
};

module.exports = Recebimento;
