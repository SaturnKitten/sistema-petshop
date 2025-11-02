const db = require('../config/db.config');

const Funcionario = {
    getAll: async () => {
        return db.query("SELECT * FROM Funcionario WHERE Removido = FALSE");
    },

    getById: async (id) => {
        return db.query("SELECT * FROM Funcionario WHERE ID = $1 AND Removido = FALSE", [id]);
    },

    create: async ({ Nome, Cargo, DataContratacao, Salario }) => {
        return db.query(
            "INSERT INTO Funcionario (Nome, Cargo, DataContratacao, Salario) VALUES ($1, $2, $3, $4) RETURNING *",
            [Nome, Cargo, DataContratacao, Salario]
        );
    },

    update: async ({ ID, Nome, Cargo, DataContratacao, Salario }) => {
        return db.query(
            "UPDATE Funcionario SET Nome = $1, Cargo = $2, DataContratacao = $3, Salario = $4 WHERE ID = $5 AND Removido = FALSE RETURNING *",
            [Nome, Cargo, DataContratacao, Salario, ID]
        );
    },

    delete: async (ID) => {
        return db.query("UPDATE Funcionario SET Removido = TRUE WHERE ID = $1 RETURNING *", [ID]);
    }
};

module.exports = Funcionario;
