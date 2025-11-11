const axios = require("axios");
const moment = require("moment");

const manutContaReceber = async (req, res) =>
  (async () => {

    const userName = req.session.userName;
    const token = req.session.token;

    const resp = await axios.get(process.env.SERVIDOR_Petshop + "/GetAllContaReceber", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(error => {
      let remoteMSG;
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error.message;
      }
      res.render("contareceber/view_manutencao.vash", {
        title: "Manutenção de Contas a Receber",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }

    res.render("contareceber/view_manutencao.vash", {
      title: "Manutenção de Contas a Receber",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertContaReceber = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;
      return res.render("contareceber/view_cadContaReceber.vash", {
        title: "Cadastro de Conta a Receber",
        data: null,
        erro: null,
        userName: req.session.userName,
      });
    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_Petshop + "/InsertContaReceber", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000,
        });

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('[ctlContaReceber|insertContaReceber] Erro ao inserir conta a receber:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  })();

const ViewContaReceber = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_Petshop + "/GetContaReceberByID",
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          response.data.registro[0].datacontratacao = moment(response.data.registro[0].datacontratacao).format("YYYY-MM-DD");

          res.render("funcionario/view/vwFRUDrFuncionario.njk", {
            title: "Visualização de Funcionário",
            data: response.data.registro[0],
            disabled: true,
            userName: userName,
          });
        } else {
          console.log("[ctlContaReceber|ViewContaReceber] ID não localizado!");
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlContaReceber|ViewContaReceber] Conta a Receber não localizada!" });
      console.log("[ctlContaReceber|ViewContaReceber] Erro não identificado", erro);
    }
  })();

const UpdateContaReceber = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_Petshop + "/GetContaReceberByID",
          { id: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          response.data.registro[0].datacontratacao = moment(response.data.registro[0].datacontratacao).format("YYYY-MM-DD");

          res.render("../views/funcionario/view/vwFRUDrFuncionario.njk", {
            title: "Atualização de Funcionário",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlContaReceber|UpdateContaReceber] Dados não localizados");
        }
      } else {
        const regData = req.body;
        const token = req.session.token;

        try {
          const response = await axios.post(process.env.SERVIDOR_Petshop + "/UpdateContaReceber", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
          });

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlContaReceber|UpdateContaReceber] Erro ao atualizar conta a receber:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: null,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlContaReceber|UpdateContaReceber] Conta a Receber não localizada!" });
      console.log("[ctlContaReceber|UpdateContaReceber] Erro não identificado", erro);
    }
  })();

const DeleteContaReceber = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_Petshop + "/DeleteContaReceber", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlContaReceber|DeleteContaReceber] Erro ao deletar conta a receber:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();

module.exports = {
  manutContaReceber,
  insertContaReceber,
  ViewContaReceber,
  UpdateContaReceber,
  DeleteContaReceber
};
