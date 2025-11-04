const mdlRecebimento = require("../model/mdlRecebimento");

const GetAllRecebimentos = (req, res) =>
  (async () => {
    let registro = await mdlRecebimento.GetAllRecebimentos();
    res.json({ status: "ok", registro: registro });
  })();

const GetRecebimentoByID = (req, res) =>
  (async () => {
    const recebimentoID = parseInt(req.body.id);
    let registro = await mdlRecebimento.GetRecebimentoByID(recebimentoID);
    res.json({ status: "ok", registro: registro });
  })();

const InsertRecebimentos = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlRecebimento.InsertRecebimentos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateRecebimentos = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlRecebimento.UpdateRecebimentos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteRecebimentos = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlRecebimento.DeleteRecebimentos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  GetAllRecebimentos,
  GetRecebimentoByID,
  InsertRecebimentos,
  UpdateRecebimentos,
  DeleteRecebimentos
};
