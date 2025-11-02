const db = require('../config/db.config');

const ContaReceber = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT cr.*, c.Nome AS NomeCliente
            FROM ContaReceber cr
            JOIN Cliente c ON cr.ID_Cliente = c.ID
            WHERE cr.Removido = FALSE AND c.Removido = FALSE
        `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT cr.*, c.Nome AS NomeCliente
            FROM ContaReceber cr
            JOIN Cliente c ON cr.ID_Cliente = c.ID
            WHERE cr.ID = ? AND cr.Removido = FALSE
        `, [id]);
        return rows[0];
    },

    create: async ({ Descricao, DataLancamento, Valor, Status, ID_Cliente }) => {
        const [result] = await db.query(`
            INSERT INTO ContaReceber (Descricao, DataLancamento, Valor, Status, ID_Cliente)
            VALUES (?, ?, ?, ?, ?)
        `, [Descricao, DataLancamento, Valor, Status || 'PENDENTE', ID_Cliente]);
        return { id: result.insertId };
    },

    update: async ({ Descricao, DataLancamento, Valor, Status, ID }) => {
        const [result] = await db.query(`
            UPDATE ContaReceber
            SET Descricao = ?, DataLancamento = ?, Valor = ?, Status = ?
            WHERE ID = ? AND Removido = FALSE
        `, [Descricao, DataLancamento, Valor, Status, ID]);
        return result;
    },

    delete: async (ID) => {
        const [result] = await db.query("UPDATE ContaReceber SET Removido = TRUE WHERE ID = ?", [ID]);
        return result;
    }
};

module.exports = ContaReceber;
