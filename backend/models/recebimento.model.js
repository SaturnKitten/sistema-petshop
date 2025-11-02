const db = require('../config/db.config');

const Recebimento = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT r.*, cr.Descricao AS ContaDescricao
            FROM Recebimento r
            JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
            WHERE r.Removido = FALSE AND cr.Removido = FALSE
        `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT r.*, cr.Descricao AS ContaDescricao
            FROM Recebimento r
            JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
            WHERE r.ID = ? AND r.Removido = FALSE
        `, [id]);
        return rows[0];
    },

    create: async ({ Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento }) => {
        const [result] = await db.query(`
            INSERT INTO Recebimento (Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento)
            VALUES (?, ?, ?, ?, ?)
        `, [Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento]);
        return { id: result.insertId };
    },

    update: async ({ Descricao, DataRecebimento, ValorRecebido, MetodoPagamento, ID }) => {
        const [result] = await db.query(`
            UPDATE Recebimento
            SET Descricao = ?, DataRecebimento = ?, ValorRecebido = ?, MetodoPagamento = ?
            WHERE ID = ? AND Removido = FALSE
        `, [Descricao, DataRecebimento, ValorRecebido, MetodoPagamento, ID]);
        return result;
    },

    delete: async (ID) => {
        const [result] = await db.query("UPDATE Recebimento SET Removido = TRUE WHERE ID = ?", [ID]);
        return result;
    }
};

module.exports = Recebimento;
