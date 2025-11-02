const db = require('../config/db.config');

const Cliente = {
    getAll: async () => {
        return db.query("SELECT * FROM Cliente WHERE Removido = FALSE ORDER BY Nome");
    },

    getById: async (id) => {
        return db.query("SELECT * FROM Cliente WHERE ID = $1 AND Removido = FALSE", [id]);
    },

    create: async ({ Nome, Telefone, Email }) => {
        return db.query(
            "INSERT INTO Cliente (Nome, Telefone, Email, DataCadastro) VALUES ($1, $2, $3, CURRENT_DATE) RETURNING *",
            [Nome, Telefone, Email]
        );
    },

    update: async ({ ID, Nome, Telefone, Email }) => {
        return db.query(
            "UPDATE Cliente SET Nome = $1, Telefone = $2, Email = $3 WHERE ID = $4 AND Removido = FALSE RETURNING *",
            [Nome, Telefone, Email, ID]
        );
    },

    delete: async (ID) => {
        return db.query("UPDATE Cliente SET Removido = TRUE WHERE ID = $1 RETURNING *", [ID]);
    }
};

module.exports = Cliente;
