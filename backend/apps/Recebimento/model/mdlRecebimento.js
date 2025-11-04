const db = require("../../../database/databaseconfig");

const getAllRecebimentos = async () => {
    return (
        await db.query(
            "SELECT *, (SELECT descricao FROM contareceber WHERE id = r.id_contareceber) " +
            "FROM recebimento r WHERE r.removido = false ORDER BY r.datarecebimento DESC"
        )
    ).rows;
};

const getRecebimentoByID = async (recebimentoID) => {
    return (
        await db.query(
            "SELECT *, (SELECT descricao FROM contareceber WHERE id = r.id_contareceber) " +
            "FROM recebimento r WHERE r.id = $1 AND r.removido = false",
            [recebimentoID]
        )
    ).rows;
};

const insertRecebimento = async (recebimentoREG) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO recebimento " +
                "VALUES (DEFAULT, $1, $2, $3, $4, $5, false)",
                [
                    recebimentoREG.descricao,
                    recebimentoREG.id_contareceber,
                    recebimentoREG.datarecebimento,
                    recebimentoREG.valorrecebido,
                    recebimentoREG.metodopagamento
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlRecebimento|insertRecebimento] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const updateRecebimento = async (recebimentoREG) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE recebimento SET " +
                "descricao = $2, " +
                "id_contareceber = $3, " +
                "datarecebimento = $4, " +
                "valorrecebido = $5, " +
                "metodopagamento = $6 " +
                "WHERE id = $1 AND removido = false",
                [
                    recebimentoREG.id,
                    recebimentoREG.descricao,
                    recebimentoREG.id_contareceber,
                    recebimentoREG.datarecebimento,
                    recebimentoREG.valorrecebido,
                    recebimentoREG.metodopagamento
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlRecebimento|updateRecebimento] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const deleteRecebimento = async (recebimentoREG) => {
    let linhasAfetadas;
    let msg = "ok";
    try {
        linhasAfetadas = (
            await db.query(
                "UPDATE recebimento SET removido = true WHERE id = $1",
                [recebimentoREG.id]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdlRecebimento|deleteRecebimento] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

module.exports = {
    getAllRecebimentos,
    getRecebimentoByID,
    insertRecebimento,
    updateRecebimento,
    deleteRecebimento,
};
