const db = require('../../../database/databaseconfig');

const GetCredencial = async (loginPar) => {
  return (
    await db.query(
      'select username, senha ' +
        'from funcionario where username = $1 and removido = false',
      [loginPar],
    )
  ).rows;
};

module.exports = {
  GetCredencial,
};