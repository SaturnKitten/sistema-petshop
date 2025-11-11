//Arquivo app/funcionario/controller/ctlFuncionario.js

const axios = require("axios");
const moment = require("moment");

const getAllFuncionario = (req, res) =>
(async () => {
    userName = req.session.userName;
    try {
        resp = await axios.get(process.env.SERVIDOR_PETSHOP + "/getAllFuncionario", {});
        res.render("funcionario/view_manutencao", {
            title: "Manutenção de Funcionários",
            data: resp.data,
            userName: userName,
        });
    } catch (erro) {
        console.log("[ctlFuncionario.js|getAllFuncionario] Try Catch:Erro de requisição");
    }
})();

function validateForm(regFormPar) {
    if (regFormPar.DataContratacao == "") {
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
            res.render("funcionario/view_cadFuncionario", {
                title: "Cadastro de Funcionários",
                data: registro,
                oper: oper,
                userName: userName,
            });
        } else {
            oper = "c";
            const funcREG = validateForm(req.body);
            resp = await axios.post(
                process.env.SERVIDOR_PETSHOP + "/insertFuncionario",
                {
                    ID: 0,
                    Nome: funcREG.Nome,
                    Cargo: funcREG.Cargo,
                    DataContratacao: funcREG.DataContratacao,
                    Salario: funcREG.Salario,
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
                registro = funcREG;
            }
            oper = "c";
            res.render("funcionario/view_cadFuncionario", {
                title: "Cadastro de Funcionários",
                data: registro,
                oper: oper,
                userName: userName,
            });
        }
    } catch (erro) {
        console.log("[ctlFuncionario.js|insertFuncionario]Try Catch:Erro não identificado", erro);
    }
})();

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
            parseInt(id);
            resp = await axios.post(
                process.env.SERVIDOR_PETSHOP + "/getFuncionarioByID",
                {
                    ID: id,
                },
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
                res.render("funcionario/view_cadFuncionario", {
                    title: "Cadastro de Funcionários",
                    data: registro,
                    oper: oper,
                    userName: userName,
                });
            }
        } else {
            oper = "vu";
            const funcREG = validateForm(req.body);
            const id = parseInt(funcREG.ID);
            resp = await axios.post(
                process.env.SERVIDOR_PETSHOP + "/updateFuncionario",
                {
                    ID: id,
                    Nome: funcREG.Nome,
                    Cargo: funcREG.Cargo,
                    DataContratacao: funcREG.DataContratacao,
                    Salario: funcREG.Salario,
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
        res.json({ status: "[ctlFuncionario.js|viewFuncionario]Funcionário não pode ser alterado" });
        console.log("[ctlFuncionario.js|viewFuncionario]Try Catch:Erro não identificado", erro);
    }
})();

const DeleteFuncionario = (req, res) =>
(async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
        oper = "v";
        const id = parseInt(req.body.id);
        resp = await axios.post(
            process.env.SERVIDOR_PETSHOP + "/DeleteFuncionario",
            {
                ID: id,
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
    } catch (erro) {
        console.log("[ctlFuncionario.js|DeleteFuncionario]Try Catch:Erro não identificado", erro);
    }
})();

module.exports = {
    getAllFuncionario,
    viewFuncionario,
    insertFuncionario,
    DeleteFuncionario,
};

})();

module.exports = {
    getAllFuncionario,
    viewFuncionario,
    insertFuncionario,
    DeleteFuncionario,
};
