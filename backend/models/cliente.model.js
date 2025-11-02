const db = require('../config/db.config');

const getAllClientes = async () => {
  const [rows] = await db.query('SELECT * FROM Cliente WHERE Removido = FALSE');
  return rows;
};

const getClienteByID = async (id) => {
  const [rows] = await db.query('SELECT * FROM Cliente WHERE ID = ? AND Removido = FALSE', [id]);
  return rows[0];
};

const insertCliente = async (nome, telefone, email) => {
  const [result] = await db.query(
    'INSERT INTO Cliente (Nome, Telefone, Email, DataCadastro) VALUES (?, ?, ?, CURDATE())',
    [nome, telefone, email]
  );
  return result.insertId;
};

const updateCliente = async (id, nome, telefone, email) => {
  await db.query(
    'UPDATE Cliente SET Nome = ?, Telefone = ?, Email = ? WHERE ID = ? AND Removido = FALSE',
    [nome, telefone, email, id]
  );
};

const deleteCliente = async (id) => {
  await db.query('UPDATE Cliente SET Removido = TRUE WHERE ID = ?', [id]);
};

module.exports = { getAllClientes, getClienteByID, insertCliente, updateCliente, deleteCliente };
