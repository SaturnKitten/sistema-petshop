const pool = require('../config/db.config');

exports.getAllRecebimentos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.ID, r.Descricao, r.DataRecebimento, r.ValorRecebido, r.MetodoPagamento,
             r.ID_ContaReceber, cr.Descricao AS ContaDescricao
      FROM Recebimento r
      JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
      WHERE r.Removido = FALSE AND cr.Removido = FALSE
      ORDER BY r.DataRecebimento DESC
    `);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRecebimentoById = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.ID, r.Descricao, r.DataRecebimento, r.ValorRecebido, r.MetodoPagamento,
             r.ID_ContaReceber, cr.Descricao AS ContaDescricao
      FROM Recebimento r
      JOIN ContaReceber cr ON r.ID_ContaReceber = cr.ID
      WHERE r.ID = $1 AND r.Removido = FALSE
    `, [req.params.id]);

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Recebimento não encontrado" });

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createRecebimento = async (req, res) => {
  const { Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO Recebimento (Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [Descricao, ID_ContaReceber, DataRecebimento, ValorRecebido, MetodoPagamento]);

    res.status(201).json({
      success: true,
      message: "Recebimento criado com sucesso",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRecebimento = async (req, res) => {
  const { Descricao, DataRecebimento, ValorRecebido, MetodoPagamento } = req.body;
  try {
    const result = await pool.query(`
      UPDATE Recebimento
      SET Descricao = $1, DataRecebimento = $2, ValorRecebido = $3, MetodoPagamento = $4
      WHERE ID = $5 AND Removido = FALSE
      RETURNING *
    `, [Descricao, DataRecebimento, ValorRecebido, MetodoPagamento, req.params.id]);

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Recebimento não encontrado" });

    res.json({
      success: true,
      message: "Recebimento atualizado com sucesso",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRecebimento = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE Recebimento SET Removido = TRUE WHERE ID = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Recebimento não encontrado" });

    res.json({
      success: true,
      message: "Recebimento removido com sucesso",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
