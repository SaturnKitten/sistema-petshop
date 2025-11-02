const pool = require('../config/db.config');

const Funcionario = {
    getAll: async () => {
        const res = await pool.query(`
            SELECT * FROM Funcionario WHERE Removido = FALSE
        `);
        return res.rows;
    },

    getById: async (id) => {
        const res = await pool.query(`
            SELECT * FROM Funcionario WHERE ID = $1 AND Removido = FALSE
        `, [id]);
        return res.rows[0];
    },

    create: async ({ Nome, Cargo, DataContratacao, Salario }) => {
        const res = await pool.query(`
            INSERT INTO Funcionario (Nome, Cargo, DataContratacao, Salario)
            VALUES ($1, $2, $3, $4)
            RETURNING ID
        `, [Nome, Cargo, DataContratacao, Salario]);
        return { id: res.rows[0].id };
    },

    update: async ({ ID, Nome, Cargo, DataContratacao, Salario }) => {
        const res = await pool.query(`
            UPDATE Funcionario
            SET Nome = $1, Cargo = $2, DataContratacao = $3, Salario = $4
            WHERE ID = $5 AND Removido = FALSE
        `, [Nome, Cargo, DataContratacao, Salario, ID]);
        return res;
    },

    delete: async (ID) => {
        const res = await pool.query(`
            UPDATE Funcionario SET Removido = TRUE WHERE ID = $1
        `, [ID]);
        return res;
    }
};

module.exports = Funcionario;
