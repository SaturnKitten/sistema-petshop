const db = require('../config/db.config');

const ContaReceber = {
    getAll: async () => {
        return db.query(`
            SELECT cr.ID, cr.Descricao, cr.DataLancamento, cr.Valor, cr.Status, cr.ID_Cliente, c.Nome AS NomeCliente
            FROM ContaReceber cr
            JOIN Cliente c ON cr.ID_Cliente = c.ID
            WHERE cr.Removido = FALSE AND c.Removido = FALSE
            ORDER BY cr.DataLancamento DESC
        `);
    },

    getById: async (id) => {
        return db.query(`
            SELECT cr.ID, cr.Descricao, cr.DataLancamento, cr.Valor, cr.Status, cr.ID_Cliente, c.Nome AS NomeCliente
            FROM ContaReceber cr
            JOIN Cliente c ON cr.ID_Cliente = c.ID
            WHERE cr.ID = $1 AND cr.Removido = FALSE
        `, [id]);
    },

    create: async ({ Descricao, DataLancamento, Valor, ID_Cliente }) => {
        return db.query(
            "INSERT INTO ContaReceber (Descricao, DataLancamento, Valor, Status, ID_Cliente) VALUES ($1, $2, $3, 'PENDENTE', $4) RETURNING *",
            [Descricao, DataLancamento, Valor, ID_Cliente]
        );
    },

    update: async ({ ID, Descricao, DataLancamento, Valor, Status }) => {
        return db.query(
            "UPDATE ContaReceber SET Descricao = $1, DataLancamento = $2, Valor = $3, Status = $4 WHERE ID = $5 AND Removido = FALSE RETURNING *",
            [Descricao, DataLancamento, Valor, Status, ID]
        );
    },

    delete: async (ID) => {
        return db.query("UPDATE ContaReceber SET Removido = TRUE WHERE ID = $1 RETURNING *", [ID]);
    }
};

module.exports = ContaReceber;

