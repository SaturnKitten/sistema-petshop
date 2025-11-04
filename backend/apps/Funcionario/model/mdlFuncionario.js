const db = require("../../../database/databaseconfig");

const GetAllFuncionarios = async () => {
  return (
    await db.query(
      "SELECT ID, Nome, Username, Cargo, DataContratacao, Salario " +
      "FROM Funcionario WHERE Removido = FALSE ORDER BY Nome ASC"
    )
  ).rows;
};

const GetFuncionarioByID = async (funcionarioIDPar) => {
  return (
    await db.query(
      "SELECT ID, Nome, Username, Cargo, DataContratacao, Salario " +
      "FROM Funcionario WHERE ID = $1 AND Removido = FALSE ORDER BY Nome ASC",
      [funcionarioIDPar]
    )
  ).rows;
};

const InsertFuncionario = async (funcionarioREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO Funcionario " +
        "VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, FALSE)",
        [
          funcionarioREGPar.nome,
          funcionarioREGPar.username,
          funcionarioREGPar.senha,
          funcionarioREGPar.cargo,
          funcionarioREGPar.datacontratacao,
          funcionarioREGPar.salario
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlFuncionario|InsertFuncionario] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateFuncionario = async (funcionarioREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Funcionario SET " +
        "Nome = $2, " +
        "Username = $3, " +
        "Senha = $4, " +
        "Cargo = $5, " +
        "DataContratacao = $6, " +
        "Salario = $7 " +
        "WHERE ID = $1",
        [
          funcionarioREGPar.id,
          funcionarioREGPar.nome,
          funcionarioREGPar.username,
          funcionarioREGPar.senha,
          funcionarioREGPar.cargo,
          funcionarioREGPar.datacontratacao,
          funcionarioREGPar.salario
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlFuncionario|UpdateFuncionario] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteFuncionario = async (funcionarioREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Funcionario SET " +
        "Removido = TRUE " +
        "WHERE ID = $1",
        [funcionarioREGPar.id]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlFuncionario|DeleteFuncionario] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  GetAllFuncionarios,
  GetFuncionarioByID,
  InsertFuncionario,
  UpdateFuncionario,
  DeleteFuncionario
};

