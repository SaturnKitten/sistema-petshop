const db = require('../config/db.config');

const Funcionario = {
    getAll: async () => {
        const [rows] = await db.query("SELECT * FROM Funcionario WHERE Removido = FALSE");
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query("SELECT * FROM Funcionario WHERE ID = ? AND Removido = FALSE", [id]);
        return rows[0];
    },

    create: async ({ Nome, Cargo, DataContratacao, Salario }) => {
        const [result] = await db.query(`
            INSERT INTO Funcionario (Nome, Cargo, DataContratacao, Salario)
            VALUES (?, ?, ?, ?)
        `, [Nome, Cargo, DataContratacao, Salario]);
        return { id: result.insertId };
    },

    update: async ({ Nome, Cargo, DataContratacao, Salario, ID }) => {
        const [result] = await db.query(`
            UPDATE Funcionario
            SET Nome = ?, Cargo = ?, DataContratacao = ?, Salario = ?
            WHERE ID = ? AND Removido = FALSE
        `, [Nome, Cargo, DataContratacao, Salario, ID]);
        return result;
    },

    delete: async (ID) => {
        const [result] = await db.query("UPDATE Funcionario SET Removido = TRUE WHERE ID = ?", [ID]);
        return result;
    }
};

module.exports = Funcionario;
