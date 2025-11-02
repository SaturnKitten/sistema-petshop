const db = require('../config/db.config');

const Recebimento = {
    getAll: async () => {
        return db.query(`
            SELECT r.ID, r.Descricao, r.DataRecebimento, r.ValorRecebido, r.MetodoPagamento, 
                   r.ID_ContaReceber, cr.Descricao AS ContaDescricao
            FROM Recebimento r
            JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
            WHERE r.Removido = FALSE AND cr.Removido = FALSE
            ORDER BY r.DataRecebimento DESC
        `);
    },

    getById: async (id) => {
        return db.query(`
            SELECT r.ID, r.Descricao, r.DataRecebimento, r.ValorRecebido, r.MetodoPagamento, 
                   r.ID_ContaReceber, cr.Descricao AS ContaDescricao
            FROM Recebimento r
            JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
            WHERE r.ID = $1 AND r.Removido = FALSE
        `, [id]);
    },

    create: async ({ Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento }) => {
        return db.query(
            "INSERT INTO Recebimento (Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento]
        );
    },

    update: async ({ ID, Descricao, DataRecebimento, ValorRecebido, MetodoPagamento }) => {
        return db.query(
            "UPDATE Recebimento SET Descricao = $1, DataRecebimento = $2, ValorRecebido = $3, MetodoPagamento = $4 WHERE ID = $5 AND Removido = FALSE RETURNING *",
            [Descricao, DataRecebimento, ValorRecebido, MetodoPagamento, ID]
        );
    },

    delete: async (ID) => {
        return db.query("UPDATE Recebimento SET Removido = TRUE WHERE ID = $1 RETURNING *", [ID]);
    }
};

module.exports = Recebimento;
