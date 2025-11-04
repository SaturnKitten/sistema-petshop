const db = require("../../../database/databaseconfig");


const getAllFuncionarios = async () => {
    return (
        await db.query(
            "SELECT ID, Nome, Cargo, DataContratacao, Salario " +
            "FROM Funcionario WHERE Removido = FALSE ORDER BY ID ASC"
        )
    ).rows;
};


const getFuncionarioByID = async (funcionarioID) => {
    return (
        await db.query(
            "SELECT ID, Nome, Cargo, DataContratacao, Salario " +
            "FROM Funcionario WHERE ID = $1 AND Removido = FALSE",
            [funcionarioID]
        )
    ).rows;
};


const insertFuncionario = async (funcionarioREG) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO Funcionario " +
                "VALUES (DEFAULT, $1, $2, $3, $4, FALSE)",
                [
                    funcionarioREG.nome,
                    funcionarioREG.cargo,
                    funcionarioREG.datacontratacao,
                    funcionarioREG.salario
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|insertFuncionario] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};


const updateFuncionario = async (funcionarioREG) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE Funcionario SET " +
                "Nome = $2, " +
                "Cargo = $3, " +
                "DataContratacao = $4, " +
                "Salario = $5 " +
                "WHERE ID = $1 AND Removido = FALSE",
                [
                    funcionarioREG.id,
                    funcionarioREG.nome,
                    funcionarioREG.cargo,
                    funcionarioREG.datacontratacao,
                    funcionarioREG.salario
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|updateFuncionario] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};


const deleteFuncionario = async (funcionarioREG) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE Funcionario SET Removido = TRUE WHERE ID = $1",
                [funcionarioREG.id]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlFuncionario|deleteFuncionario] " + error.detail;
        linhasAfetadas = -1;
    }

    return { msg, linhasAfetadas };
};

module.exports = {
    getAllFuncionarios,
    getFuncionarioByID,
    insertFuncionario,
    updateFuncionario,
    deleteFuncionario,
};
