const mdlFuncionario = require("../model/mdlFuncionario");


const getAllFuncionarios = (req, res) =>
  (async () => {
    try {
      const registro = await mdlFuncionario.getAllFuncionarios();
      res.json({ status: "ok", registro });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();


const getFuncionarioByID = (req, res) =>
  (async () => {
    try {
      const funcionarioID = parseInt(req.body.id);
      const registro = await mdlFuncionario.getFuncionarioByID(funcionarioID);
      res.json({ status: "ok", registro });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();


const insertFuncionario = (req, res) =>
  (async () => {
    try {
      const registro = req.body;
      const { msg, linhasAfetadas } = await mdlFuncionario.insertFuncionario(registro);
      res.json({ status: msg, linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();


const updateFuncionario = (req, res) =>
  (async () => {
    try {
      const registro = req.body;
      const { msg, linhasAfetadas } = await mdlFuncionario.updateFuncionario(registro);
      res.json({ status: msg, linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();


const deleteFuncionario = (req, res) =>
  (async () => {
    try {
      const registro = req.body;
      const { msg, linhasAfetadas } = await mdlFuncionario.deleteFuncionario(registro);
      res.json({ status: msg, linhasAfetadas });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  })();

module.exports = {
  getAllFuncionarios,
  getFuncionarioByID,
  insertFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
