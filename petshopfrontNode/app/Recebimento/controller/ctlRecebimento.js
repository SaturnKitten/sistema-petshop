const axios = require("axios");
const moment = require("moment");

//@ Abre o formulário de manutenção de recebimentos
const getAllRecebimento = (req, res) =>
(async () => {
  userName = req.session.userName;
  try {
    resp = await axios.get(process.env.SERVIDOR_PETSHOP + "/getAllRecebimento", {});
    res.render("Recebimento/view_manutencao", {
      title: "Manutenção de Recebimentos",
      data: resp.data,
      userName: userName,
    });
  } catch (erro) {
    console.log("[ctlRecebimento.js|getAllRecebimento] Try Catch: Erro de requisição");
  }
})();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
  if (regFormPar.DataRecebimento == "") {
    regFormPar.DataRecebimento = null;
  }
  return regFormPar;
}

//@ Abre e faz operações de CRUD no formulário de cadastro de recebimentos
const insertRecebimento = (req, res) =>
(async () => {
  var oper = "";
  var registro = {};
  var contas = {};
  userName = req.session.userName;
  token = req.session.token;
  try {
    if (req.method == "GET") {
      oper = "c";
      contas = await axios.get(process.env.SERVIDOR_PETSHOP + "/getAllContaReceber", {});
      registro = {
        ID: 0,
        Descricao: "",
        ID_ContaReceber: 0,
        DataRecebimento: "",
        ValorRecebido: "0.00",
        MetodoPagamento: "",
        Removido: false,
      };
      res.render("Recebimento/view_cadRecebimento", {
        title: "Cadastro de Recebimento",
        data: registro,
        conta: contas.data.registro,
        oper: oper,
        userName: userName,
      });
    } else {
      oper = "c";
      const recebimentoREG = validateForm(req.body);
      resp = await axios.post(
        process.env.SERVIDOR_PETSHOP + "/insertRecebimento",
        {
          ID: 0,
          Descricao: recebimentoREG.Descricao,
          ID_ContaReceber: recebimentoREG.ID_ContaReceber,
          DataRecebimento: recebimentoREG.DataRecebimento,
          ValorRecebido: recebimentoREG.ValorRecebido,
          MetodoPagamento: recebimentoREG.MetodoPagamento,
          Removido: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log("[ctlRecebimento|insertRecebimento] resp:", resp.data);
      if (resp.data.status == "ok") {
        registro = {
          ID: 0,
          Descricao: "",
          ID_ContaReceber: 0,
          DataRecebimento: "",
          ValorRecebido: "0.00",
          MetodoPagamento: "",
          Removido: false,
        };
      } else {
        registro = recebimentoREG;
      }

      contas = await axios.get(process.env.SERVIDOR_PETSHOP + "/getAllContaReceber", {});
      oper = "c";
      res.render("Recebimento/view_cadRecebimento", {
        title: "Cadastro de Recebimento",
        data: registro,
        conta: contas.data.registro,
        oper: oper,
        userName: userName,
      });
    }
  } catch (erro) {
    console.log("[ctlRecebimento.js|insertRecebimento] Try Catch: Erro não identificado", erro);
  }
})();

//@ Abre o formulário de cadastro de recebimentos para futura edição
const viewRecebimento = (req, res) =>
(async () => {
  var oper = "";
  var registro = {};
  var contas = {};
  userName = req.session.userName;
  token = req.session.token;
  try {
    if (req.method == "GET") {
      const id = req.params.id;
      oper = req.params.oper;
      parseInt(id);
      resp = await axios.post(
        process.env.SERVIDOR_PETSHOP + "/getRecebimentoByID",
        { ID: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        registro = resp.data.registro[0];
        registro.DataRecebimento = moment(registro.DataRecebimento).format("YYYY-MM-DD");
        contas = await axios.get(process.env.SERVIDOR_PETSHOP + "/getAllContaReceber", {});
        console.log("[ctlRecebimento|viewRecebimento] GET oper:", oper);

        res.render("Recebimento/view_cadRecebimento", {
          title: "Cadastro de Recebimento",
          data: registro,
          conta: contas.data.registro,
          oper: oper,
          userName: userName,
        });
      }
    } else {
      oper = "vu";
      console.log("[ctlRecebimento|viewRecebimento] POST oper:", oper);
      const recebimentoREG = validateForm(req.body);
      const id = parseInt(recebimentoREG.ID);
      resp = await axios.post(
        process.env.SERVIDOR_PETSHOP + "/updateRecebimento",
        {
          ID: id,
          Descricao: recebimentoREG.Descricao,
          ID_ContaReceber: recebimentoREG.ID_ContaReceber,
          DataRecebimento: recebimentoREG.DataRecebimento,
          ValorRecebido: recebimentoREG.ValorRecebido,
          MetodoPagamento: recebimentoREG.MetodoPagamento,
          Removido: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp.data.status == "ok") {
        res.json({ status: "ok" });
      } else {
        res.json({ status: "erro" });
      }
    }
  } catch (erro) {
    res.json({ status: "[ctlRecebimento.js|viewRecebimento] Recebimento não pode ser alterado" });
    console.log("[ctlRecebimento.js|viewRecebimento] Try Catch: Erro não identificado", erro);
  }
})();

//@ Remove o recebimento selecionado
const DeleteRecebimento = (req, res) =>
(async () => {
  var oper = "";
  userName = req.session.userName;
  token = req.session.token;
  try {
    oper = "v";
    const id = parseInt(req.body.id);
    resp = await axios.post(
      process.env.SERVIDOR_PETSHOP + "/deleteRecebimento",
      { ID: id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (resp.data.status == "ok") {
      res.json({ status: "ok" });
    } else {
      res.json({ status: "erro" });
    }
  } catch (erro) {
    console.log("[ctlRecebimento.js|DeleteRecebimento] Try Catch: Erro não identificado", erro);
  }
})();

module.exports = {
  getAllRecebimento,
  viewRecebimento,
  insertRecebimento,
  DeleteRecebimento,
};
