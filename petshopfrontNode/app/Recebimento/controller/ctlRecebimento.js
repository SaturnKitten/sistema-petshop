//Arquivo app/recebimentos/controller/ctlRecebimento.js

const axios = require("axios");
const moment = require("moment");

//@ Abre o formulário de manutenção de recebimentos
const getAllRecebimento = (req, res) =>
(async () => {
    userName = req.session.userName;
    try {
        resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllRecebimento", {});
        res.render("recebimento/view_manutencao", {
            title: "Manutenção de recebimento",
            data: resp.data,
            userName: userName,
        });
    } catch (erro) {
        console.log("[ctlRecebimento|getAllRecebimento] Erro de requisição:", erro);
    }
})();

//@ Função para validar campos no formulário
function validateForm(regFormPar) {
    if (regFormPar.DataRecebimento === "") {
        regFormPar.DataRecebimento = null;
    }
    return regFormPar;
}

//@ Insere novo recebimento
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
            contas = await axios.get(process.env.SERVIDOR_DW3 + "/getAllContaReceber", {});
            registro = {
                ID: 0,
                Descricao: "",
                ID_ContaReceber: 0,
                DataRecebimento: "",
                ValorRecebido: "0.00",
                MetodoPagamento: "",
                Removido: false,
            };
            res.render("recebimento/view_cadRecebimento", {
                title: "Cadastro de recebimento",
                data: registro,
                conta: contas.data.registro,
                oper: oper,
                userName: userName,
            });
        } else {
            oper = "c";
            const recebimentoREG = validateForm(req.body);
            resp = await axios.post(
                process.env.SERVIDOR_DW3 + "/insertRecebimento",
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

            contas = await axios.get(process.env.SERVIDOR_DW3 + "/getAllContaReceber", {});
            oper = "c";
            res.render("recebimento/view_cadRecebimento", {
                title: "Cadastro de recebimento",
                data: registro,
                conta: contas.data.registro,
                oper: oper,
                userName: userName,
            });
        }
    } catch (erro) {
        console.log("[ctlRecebimento|insertRecebimento] Erro não identificado:", erro);
    }
})();

//@ Abre o formulário para edição de recebimento
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
            resp = await axios.post(
                process.env.SERVIDOR_DW3 + "/getRecebimentoByID",
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
                contas = await axios.get(process.env.SERVIDOR_DW3 + "/getAllContaReceber", {});
                res.render("recebimento/view_cadRecebimento", {
                    title: "Cadastro de recebimento",
                    data: registro,
                    conta: contas.data.registro,
                    oper: oper,
                    userName: userName,
                });
            }
        } else {
            oper = "vu";
            const recebimentoREG = validateForm(req.body);
            const id = parseInt(recebimentoREG.ID);
            resp = await axios.post(
                process.env.SERVIDOR_DW3 + "/updateRecebimento",
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
        res.json({ status: "[ctlRecebimento|viewRecebimento] Recebimento não pode ser alterado" });
        console.log("[ctlRecebimento|viewRecebimento] Erro:", erro);
    }
})();

//@ Remove o recebimento
const DeleteRecebimento = (req, res) =>
(async () => {
    userName = req.session.userName;
    token = req.session.token;
    try {
        const id = parseInt(req.body.id);
        resp = await axios.post(
            process.env.SERVIDOR_DW3 + "/DeleteRecebimento",
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
        console.log("[ctlRecebimento|DeleteRecebimento] Erro:", erro);
    }
})();

module.exports = {
    getAllRecebimento,
    viewRecebimento,
    insertRecebimento,
    DeleteRecebimento,
};

