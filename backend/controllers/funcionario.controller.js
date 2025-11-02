const db = require('../config/db.config');

exports.getAllFuncionarios = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Funcionario WHERE Removido = FALSE ORDER BY Nome");
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFuncionarioById = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Funcionario WHERE ID = $1 AND Removido = FALSE", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createFuncionario = async (req, res) => {
  const { Nome, Cargo, DataContratacao, Salario } = req.body;
  try {
    const { rows } = await db.query(`
      INSERT INTO Funcionario (Nome, Cargo, DataContratacao, Salario)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [Nome, Cargo, DataContratacao, Salario]);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFuncionario = async (req, res) => {
  const { Nome, Cargo, DataContratacao, Salario } = req.body;
  try {
    const { rows } = await db.query(`
      UPDATE Funcionario
      SET Nome = $1, Cargo = $2, DataContratacao = $3, Salario = $4
      WHERE ID = $5 AND Removido = FALSE
      RETURNING *
    `, [Nome, Cargo, DataContratacao, Salario, req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
    res.json({ success: true, message: "Funcionário atualizado com sucesso", data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteFuncionario = async (req, res) => {
  try {
    const { rows } = await db.query("UPDATE Funcionario SET Removido = TRUE WHERE ID = $1 RETURNING *", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Funcionário não encontrado" });
    res.json({ success: true, message: "Funcionário removido com sucesso", data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
