const db = require("../../../database/databaseconfig");

const GetAllRecebimentos = async () => {
  return (
    await db.query(
      "SELECT ID, Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento " +
      "FROM Recebimento WHERE Removido = FALSE ORDER BY DataRecebimento DESC"
    )
  ).rows;
};

const GetRecebimentoByID = async (recebimentoIDPar) => {
  return (
    await db.query(
      "SELECT ID, Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento " +
      "FROM Recebimento WHERE ID = $1 AND Removido = FALSE ORDER BY DataRecebimento DESC",
      [recebimentoIDPar]
    )
  ).rows;
};

const InsertRecebimentos = async (recebimentoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO Recebimento " +
        "VALUES (DEFAULT, $1, $2, $3, $4, $5, FALSE)",
        [
          recebimentoREGPar.descricao,
          recebimentoREGPar.id_contareceber,
          recebimentoREGPar.datarecebimento,
          recebimentoREGPar.valorrecebido,
          recebimentoREGPar.metodopagamento
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlRecebimento|InsertRecebimentos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateRecebimentos = async (recebimentoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Recebimento SET " +
        "Descricao = $2, " +
        "ID_ContaReceber = $3, " +
        "DataRecebimento = $4, " +
        "ValorRecebido = $5, " +
        "MetodoPagamento = $6 " +
        "WHERE ID = $1",
        [
          recebimentoREGPar.id,
          recebimentoREGPar.descricao,
          recebimentoREGPar.id_contareceber,
          recebimentoREGPar.datarecebimento,
          recebimentoREGPar.valorrecebido,
          recebimentoREGPar.metodopagamento
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlRecebimento|UpdateRecebimentos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteRecebimentos = async (recebimentoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Recebimento SET Removido = TRUE WHERE ID = $1",
        [recebimentoREGPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlRecebimento|DeleteRecebimentos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllRecebimentos,
  GetRecebimentoByID,
  InsertRecebimentos,
  UpdateRecebimentos,
  DeleteRecebimentos
};

