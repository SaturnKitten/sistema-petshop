const db = require('../config/db.config');

const Cliente = {
    // 🔹 Buscar todos os clientes não removidos
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM Cliente WHERE Removido = FALSE");
        return rows;
    },

    // 🔹 Buscar cliente pelo ID
    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM Cliente WHERE ID = ? AND Removido = FALSE", [id]);
        return rows[0]; // retorna só um cliente
    },

    // 🔹 Criar novo cliente
    create: async ({ Nome, Telefone, Email }) => {
        const [result] = await db.query(
            "INSERT INTO Cliente (Nome, Telefone, Email, DataCadastro) VALUES (?, ?, ?, CURDATE())",
            [Nome, Telefone, Email]
        );
        return { id: result.insertId };
    },

    // 🔹 Atualizar cliente existente
    update: async ({ Nome, Telefone, Email, ID }) => {
        const [result] = await db.query(
            "UPDATE Cliente SET Nome = ?, Telefone = ?, Email = ? WHERE ID = ? AND Removido = FALSE",
            [Nome, Telefone, Email, ID]
        );
        return result;
    },

    // 🔹 Excluir (soft delete)
    delete: async (ID) => {
        const [result] = await db.query("UPDATE Cliente SET Removido = TRUE WHERE ID = ?", [ID]);
        return result;
    }
};

module.exports = Cliente;
