const axios = require("axios");
const moment = require("moment");

const manutFuncionarios = async (req, res) =>
  (async () => {

    const userName = req.session.userName;
    const token = req.session.token;

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/GetAllFuncionarios", {
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
      res.render("funcionario/view/vwManutFuncionario.njk", {
        title: "Manutenção de Funcionários",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }

    res.render("funcionario/view/vwManutFuncionario.njk", {
      title: "Manutenção de Funcionários",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertFuncionario = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;
      return res.render("funcionario/view/vwFCrFuncionario.njk", {
        title: "Cadastro de Funcionário",
        data: null,
        erro: null,
        userName: req.session.userName,
      });
    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/InsertFuncionario", regData, {
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
        console.error('[ctlFuncionario|insertFuncionario] Erro ao inserir funcionário:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: null,
          erro: null,
        });
      }
    }
  })();

const ViewFuncionario = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/GetFuncionarioByID",
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
          console.log("[ctlFuncionario|ViewFuncionario] ID não localizado!");
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlFuncionario|ViewFuncionario] Funcionário não localizado!" });
      console.log("[ctlFuncionario|ViewFuncionario] Erro não identificado", erro);
    }
  })();

const UpdateFuncionario = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/GetFuncionarioByID",
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
            title: "Atualização de Funcionário",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlFuncionario|UpdateFuncionario] Dados não localizados");
        }
      } else {
        const regData = req.body;
        const token = req.session.token;

        try {
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/UpdateFuncionario", regData, {
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
          console.error('[ctlFuncionario|UpdateFuncionario] Erro ao atualizar funcionário:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: null,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlFuncionario|UpdateFuncionario] Funcionário não localizado!" });
      console.log("[ctlFuncionario|UpdateFuncionario] Erro não identificado", erro);
    }
  })();

const DeleteFuncionario = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/DeleteFuncionario", regData, {
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
      console.error('[ctlFuncionario|DeleteFuncionario] Erro ao deletar funcionário:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: null,
      });
    }
  })();

module.exports = {
  manutFuncionarios,
  insertFuncionario,
  ViewFuncionario,
  UpdateFuncionario,
  DeleteFuncionario
};
