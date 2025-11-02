const pool = require('../config/db.config');

exports.getAllContasReceber = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cr.ID, cr.Descricao, cr.DataLancamento, cr.Valor, cr.Status, cr.ID_Cliente, c.Nome AS NomeCliente
      FROM ContaReceber cr
      JOIN Cliente c ON cr.ID_Cliente = c.ID
      WHERE cr.Removido = FALSE AND c.Removido = FALSE
      ORDER BY cr.DataLancamento DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getContaReceberById = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT cr.ID, cr.Descricao, cr.DataLancamento, cr.Valor, cr.Status, cr.ID_Cliente, c.Nome AS NomeCliente
      FROM ContaReceber cr
      JOIN Cliente c ON cr.ID_Cliente = c.ID
      WHERE cr.ID = $1 AND cr.Removido = FALSE
    `, [req.params.id]);

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Conta a receber não encontrada" });

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createContaReceber = async (req, res) => {
  const { Descricao, DataLancamento, Valor, ID_Cliente } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO ContaReceber (Descricao, DataLancamento, Valor, Status, ID_Cliente)
      VALUES ($1, $2, $3, 'PENDENTE', $4)
      RETURNING *
    `, [Descricao, DataLancamento, Valor, ID_Cliente]);

    res.status(201).json({
      success: true,
      message: "Conta a receber criada com sucesso",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateContaReceber = async (req, res) => {
  const { Descricao, DataLancamento, Valor, Status } = req.body;
  try {
    const result = await pool.query(`
      UPDATE ContaReceber
      SET Descricao = $1, DataLancamento = $2, Valor = $3, Status = $4
      WHERE ID = $5 AND Removido = FALSE
      RETURNING *
    `, [Descricao, DataLancamento, Valor, Status, req.params.id]);

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Conta não encontrada" });

    res.json({
      success: true,
      message: "Conta atualizada com sucesso",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteContaReceber = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE ContaReceber SET Removido = TRUE WHERE ID = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Conta não encontrada" });

    res.json({
      success: true,
      message: "Conta removida com sucesso",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
