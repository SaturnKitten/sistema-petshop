const db = require("../../../database/databaseconfig");

const GetAllContas = async () => {
    return (
        await db.query(
            "SELECT ID, Descricao, DataLancamento, Valor, Status " + 
            "FROM ContaReceber WHERE Removido = FALSE ORDER BY ID ASC"
        )
    ).rows;
};

const GetContasByID = async (contaIDPar) => {
    return (
        await db.query(
            "SELECT ID, Descricao, DataLancamento, Valor, Status " +
            "FROM ContaReceber WHERE ID = $1 AND Removido = FALSE",
            [contaIDPar]
        )
    ).rows;
};

const InsertContas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO ContaReceber (Descricao, DataLancamento, Valor, Status) " +
                "VALUES ($1, $2, $3, $4)",
                [
                    registroPar.descricao,
                    registroPar.dataLancamento,
                    registroPar.valor,
                    registroPar.status
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlContaReceber|insertContas] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const UpdateContas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE ContaReceber SET " +
                "Descricao = $2, " +
                "DataLancamento = $3, " +
                "Valor = $4, " +
                "Status = $5 " +
                "WHERE ID = $1 AND Removido = FALSE",
                [
                    registroPar.id,
                    registroPar.descricao,
                    registroPar.dataLancamento,
                    registroPar.valor,
                    registroPar.status
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlContaReceber|updateContas] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const DeleteContas = async (registroPar) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE ContaReceber SET Removido = TRUE WHERE ID = $1",
                [registroPar.id]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlContaReceber|deleteContas] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

module.exports = {
    GetAllContas,
    GetContasByID,
    InsertContas,
    UpdateContas,
    DeleteContas
};

   
