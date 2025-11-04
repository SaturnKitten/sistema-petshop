const express = require("express");
const routerApp = express.Router();

const appContas = require("../apps/ContaReceber/controller/ctlContaReceber");
const appFuncionario = require("../apps/Funcionario/controller/ctlFuncionario");
const appRecebimento = require("../apps/Recebimento/controller/ctlRecebimento");    
const appLogin = require("../apps/Login/controller/ctlLogin");


routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de ContaReceber
routerApp.get("/GetAllContas", appLogin.AutenticaJWT, appContas.GetAllContas);
routerApp.post("/GetContasByID", appLogin.AutenticaJWT, appContas.GetContasByID);
routerApp.post("/InsertContas", appLogin.AutenticaJWT, appContas.InsertContas);
routerApp.post("/UpdateContas", appLogin.AutenticaJWT, appContas.UpdateContas);
routerApp.post("/DeleteContas", appLogin.AutenticaJWT, appContas.DeleteContas);

//Rotas de Funcionarios
routerApp.get("/GetAllFuncionarios", appLogin.AutenticaJWT, appFuncionario.GetAllFuncionarios);
routerApp.post("/GetFuncionarioByID", appLogin.AutenticaJWT, appFuncionario.GetFuncionarioByID);
routerApp.post("/InsertFuncionario", appLogin.AutenticaJWT, appFuncionario.InsertFuncionario);
routerApp.post("/UpdateFuncionario", appLogin.AutenticaJWT, appFuncionario.UpdateFuncionario);
routerApp.post("/DeleteFuncionario", appLogin.AutenticaJWT, appFuncionario.DeleteFuncionario);

//Rotas de Recebimentos
routerApp.get("/GetAllRecebimentos", appLogin.AutenticaJWT, appRecebimento.GetAllRecebimentos);
routerApp.post("/GetRecebimentoByID", appLogin.AutenticaJWT, appRecebimento.GetRecebimentoByID);
routerApp.post("/InsertRecebimento", appLogin.AutenticaJWT, appRecebimento.InsertRecebimento);
routerApp.post("/UpdateRecebimento", appLogin.AutenticaJWT, appRecebimento.UpdateRecebimento);
routerApp.post("/DeleteRecebimento", appLogin.AutenticaJWT, appRecebimento.DeleteRecebimento);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;