const mdlFuncionario = require("../model/mdlFuncionario");

const GetAllFuncionarios = (req, res) =>
  (async () => {
    let registro = await mdlFuncionario.GetAllFuncionarios();
    res.json({ status: "ok", registro: registro });
  })();

const GetFuncionarioByID = (req, res) =>
  (async () => {
    const funcionarioID = parseInt(req.body.id);
    let registro = await mdlFuncionario.GetFuncionarioByID(funcionarioID);
    res.json({ status: "ok", registro: registro });
  })();

const InsertFuncionario = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlFuncionario.InsertFuncionario(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const UpdateFuncionario = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlFuncionario.UpdateFuncionario(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

const DeleteFuncionario = (request, res) =>
  (async () => {
    const registro = request.body;
    let { msg, linhasAfetadas } = await mdlFuncionario.DeleteFuncionario(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
  })();

module.exports = {
  GetAllFuncionarios,
  GetFuncionarioByID,
  InsertFuncionario,
  UpdateFuncionario,
  DeleteFuncionario
};

