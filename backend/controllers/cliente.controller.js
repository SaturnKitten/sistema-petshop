const pool = require('../config/db.config');

exports.getAllClientes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Cliente WHERE Removido = FALSE ORDER BY Nome");
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM Cliente WHERE ID = $1 AND Removido = FALSE",
      [req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Cliente não encontrado" });

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCliente = async (req, res) => {
  const { Nome, Telefone, Email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Cliente (Nome, Telefone, Email, DataCadastro) VALUES ($1, $2, $3, CURRENT_DATE) RETURNING *",
      [Nome, Telefone, Email]
    );

    res.status(201).json({
      success: true,
      message: "Cliente criado com sucesso",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  const { Nome, Telefone, Email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Cliente SET Nome = $1, Telefone = $2, Email = $3 WHERE ID = $4 AND Removido = FALSE RETURNING *",
      [Nome, Telefone, Email, req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Cliente não encontrado" });

    res.json({
      success: true,
      message: "Cliente atualizado com sucesso",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE Cliente SET Removido = TRUE WHERE ID = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Cliente não encontrado" });

    res.json({
      success: true,
      message: "Cliente removido com sucesso",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
