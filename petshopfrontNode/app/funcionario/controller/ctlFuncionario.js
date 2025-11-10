
const axios = require("axios");
const moment = require("moment");


const getAllFuncionario = (req, res) =>
(async () => {
    userName = req.session.userName;
    try {
        resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllFuncionario", {});
        res.render("funcionarios/view_manutencao", {
            title: "Manutenção de funcionários",
            data: resp.data,
            userName: userName,
        });
    } catch (erro) {
        console.log("[ctlFuncionario|getAllFuncionario] Erro de requisição:", erro);
    }
})();


function validateForm(regFormPar) {
    if (regFormPar.DataContratacao === "") {
        regFormPar.DataContratacao = null;
    }
    return regFormPar;
}


const insertFuncionario = (req, res) =>
(async () => {
    var oper = "";
    var registro = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
        if (req.method == "GET") {
            oper = "c";
            registro = {
                ID: 0,
                Nome: "",
                Cargo: "",
                DataContratacao: "",
                Salario: "0.00",
                Removido: false,
            };
            res.render("funcionarios/view_cadFuncionario", {
                title: "Cadastro de funcionário",
                data: registro,
                oper: oper,
                userName: userName,
            });
        } else {
            oper = "c";
            const funcionarioREG = validateForm(req.body);
            resp = await axios.post(
                process.env.SERVIDOR_DW3 + "/insertFuncionario",
                {
                    ID: 0,
                    Nome: funcionarioREG.Nome,
                    Cargo: funcionarioREG.Cargo,
                    DataContratacao: funcionarioREG.DataContratacao,
                    Salario: funcionarioREG.Salario,
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
                    Nome: "",
                    Cargo: "",
                    DataContratacao: "",
                    Salario: "0.00",
                    Removido: false,
                };
            } else {
                registro = funcionarioREG;
            }

            oper = "c";
            res.render("funcionarios/view_cadFuncionario", {
                title: "Cadastro de funcionário",
                data: registro,
                oper: oper,
                userName: userName,
            });
        }
    } catch (erro) {
        console.log("[ctlFuncionario|insertFuncionario] Erro não identificado:", erro);
    }
})();

//@ Abre o formulário para edição de funcionário
const viewFuncionario = (req, res) =>
(async () => {
    var oper = "";
    var registro = {};
    userName = req.session.userName;
    token = req.session.token;
    try {
        if (req.method == "GET") {
            const id = req.params.id;
            oper = req.params.oper;
            resp = await axios.post(
                process.env.SERVIDOR_DW3 + "/getFuncionarioByID",
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
                registro.DataContratacao = moment(registro.DataContratacao).format("YYYY-MM-DD");

                res.render("funcionarios/view_cadFuncionario", {
                    title: "Cadastro de funcionário",
                    data: registro,
                    oper: oper,
                    userName: userName,
                });
            }
        } else {
            oper = "vu";
            const funcionarioREG = validateForm(req.body);
            const id = parseInt(funcionarioREG.ID);
            resp = await axios.post(
                process.env.SERVIDOR_DW3 + "/updateFuncionario",
                {
                    ID: id,
                    Nome: funcionarioREG.Nome,
                    Cargo: funcionarioREG.Cargo,
                    DataContratacao: funcionarioREG.DataContratacao,
                    Salario: funcionarioREG.Salario,
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
        res.json({ status: "[ctlFuncionario|viewFuncionario] Funcionário não pode ser alterado" });
        console.log("[ctlFuncionario|viewFuncionario] Erro:", erro);
    }
})();


const DeleteFuncionario = (req, res) =>
(async () => {
    userName = req.session.userName;
    token = req.session.token;
    try {
        const id = parseInt(req.body.id);
        resp = await axios.post(
            process.env.SERVIDOR_DW3 + "/DeleteFuncionario",
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
        console.log("[ctlFuncionario|DeleteFuncionario] Erro:", erro);
    }
})();

module.exports = {
    GetAllFuncionario,
    ViewFuncionario,
    InsertFuncionario,
    DeleteFuncionario,
};
