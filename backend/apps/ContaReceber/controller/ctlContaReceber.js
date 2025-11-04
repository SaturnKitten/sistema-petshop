const mdlContaReceber = require("../model/mdlContaReceber");

const getAllContas = (req, res) =>
  (async () => {
    let registro = await mdlContaReceber.getAllContas();
    res.json({ status: "ok", registro: registro });
  })();

const getContasByID = (req, res) =>
  (async () => {
    const contaID = parseInt(req.body.ID);
    let registro = await mdlContaReceber.getContaByID(contaID);
    res.json({ status: "ok", registro: registro });
  })();

const insertContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlContaReceber.insertContas(contaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const updateContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlContaReceber.updateContas(contaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const deleteContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlContaReceber.deleteContas(contaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  getAllContas,
  getContasByID,
  insertContas,
  updateContas,
  deleteContas
};

