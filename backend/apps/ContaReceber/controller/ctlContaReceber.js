const mdlContaReceber = require("../model/mdlContaReceber");

const GetAllContas = (req, res) =>
  (async () => {
    let registro = await mdlContaReceber.getAllContas();
    res.json({ status: "ok", registro: registro });
  })();

const GetContasByID = (req, res) =>
  (async () => {
    const contaID = parseInt(req.body.ID);
    let registro = await mdlContaReceber.getContaByID(contaID);
    res.json({ status: "ok", registro: registro });
  })();

const InsertContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlContaReceber.insertContas(contaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlContaReceber.updateContas(contaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteContas = (request, res) =>
  (async () => {
    const contaREG = request.body;
    let { msg, linhasAfetadas } = await mdlContaReceber.deleteContas(contaREG);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  GetAllContas,
  GetContasByID,
  InsertContas,
  UpdateContas,
  DeleteContas
};