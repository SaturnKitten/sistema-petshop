const pool = require('../config/db.config');

const ContaReceber = {
    getAll: async () => {
        const res = await pool.query(`
            SELECT cr.*, c.Nome AS NomeCliente
            FROM ContaReceber cr
            JOIN Cliente c ON cr.ID_Cliente = c.ID
            WHERE cr.Removido = FALSE AND c.Removido = FALSE
        `);
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query(`
            SELECT cr.*, c.Nome AS NomeCliente
            FROM ContaReceber cr
            JOIN Cliente c ON cr.ID_Cliente = c.ID
            WHERE cr.ID = $1 AND cr.Removido = FALSE
        `, [id]);
        return res.rows[0];
    },

    create: async ({ Descricao, DataLancamento, Valor, ID_Cliente }) => {
        const res = await pool.query(`
            INSERT INTO ContaReceber (Descricao, DataLancamento, Valor, Status, ID_Cliente)
            VALUES ($1, $2, $3, 'PENDENTE', $4)
            RETURNING ID
        `, [Descricao, DataLancamento, Valor, ID_Cliente]);
        return { id: res.rows[0].id };
    },

    update: async ({ ID, Descricao, DataLancamento, Valor, Status }) => {
        const res = await pool.query(`
            UPDATE ContaReceber
            SET Descricao = $1, DataLancamento = $2, Valor = $3, Status = $4
            WHERE ID = $5 AND Removido = FALSE
        `, [Descricao, DataLancamento, Valor, Status, ID]);
        return res;
    },

    delete: async (ID) => {
        const res = await pool.query(`
            UPDATE ContaReceber SET Removido = TRUE WHERE ID = $1
        `, [ID]);
        return res;
    }
};

module.exports = ContaReceber;
