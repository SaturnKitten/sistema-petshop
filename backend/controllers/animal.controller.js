const db = require('../config/db.config');

exports.getAllAnimals = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, a.ID_Cliente, c.Nome AS NomeCliente
      FROM Animal a
      JOIN Cliente c ON a.ID_Cliente = c.ID
      WHERE a.Removido = FALSE AND c.Removido = FALSE
      ORDER BY a.Nome
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT a.ID, a.Nome, a.Especie, a.Raca, a.DataNascimento, a.ID_Cliente, c.Nome AS NomeCliente
      FROM Animal a
      JOIN Cliente c ON a.ID_Cliente = c.ID
      WHERE a.ID = $1 AND a.Removido = FALSE
    `, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Animal não encontrado" });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAnimal = async (req, res) => {
  const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
  try {
    const { rows } = await db.query(`
      INSERT INTO Animal (Nome, Especie, Raca, DataNascimento, ID_Cliente)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [Nome, Especie, Raca, DataNascimento, ID_Cliente]);
    res.status(201).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAnimal = async (req, res) => {
  const { Nome, Especie, Raca, DataNascimento, ID_Cliente } = req.body;
  try {
    const { rows } = await db.query(`
      UPDATE Animal
      SET Nome = $1, Especie = $2, Raca = $3, DataNascimento = $4, ID_Cliente = $5
      WHERE ID = $6 AND Removido = FALSE
      RETURNING *
    `, [Nome, Especie, Raca, DataNascimento, ID_Cliente, req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Animal não encontrado" });
    res.json({ success: true, message: "Animal atualizado com sucesso", data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const { rows } = await db.query("UPDATE Animal SET Removido = TRUE WHERE ID = $1 RETURNING *", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: "Animal não encontrado" });
    res.json({ success: true, message: "Animal removido com sucesso", data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
