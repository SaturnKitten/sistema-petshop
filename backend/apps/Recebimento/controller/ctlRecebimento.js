const mdlRecebimento = require("../model/mdlRecebimento");

const getAllRecebimentos = (req, res) =>
  (async () => {
    try {
      const registro = await mdlRecebimento.getAllRecebimentos();
      res.json({ status: "ok", registro });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();

const getRecebimentoByID = (req, res) =>
  (async () => {
    try {
      const recebimentoID = parseInt(req.body.recebimentoid);
      const registro = await mdlRecebimento.getRecebimentoByID(recebimentoID);
      res.json({ status: "ok", registro });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();

const insertRecebimentos = (req, res) =>
  (async () => {
    try {
      const registro = req.body;
      const { msg, linhasAfetadas } = await mdlRecebimento.insertRecebimento(registro);
      res.json({ status: msg, linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();

const updateRecebimentos = (req, res) =>
  (async () => {
    try {
      const registro = req.body;
      const { msg, linhasAfetadas } = await mdlRecebimento.updateRecebimento(registro);
      res.json({ status: msg, linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();

const deleteRecebimentos = (req, res) =>
  (async () => {
    try {
      const registro = req.body;
      const { msg, linhasAfetadas } = await mdlRecebimento.deleteRecebimento(registro);
      res.json({ status: msg, linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();

module.exports = {
  getAllRecebimentos,
  getRecebimentoByID,
  insertRecebimentos,
  updateRecebimentos,
  deleteRecebimentos,
};