var express = require('express');
var funcionarioApp = require("../app/funcionario/controller/ctlFuncionario")
var router = express.Router();

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {

  // Verificar se existe uma sessão válida.
  isLogged = req.session.isLogged;

  if (!isLogged) {
    res.redirect("/Login");
  }
  next();
};

/* GET métodos */
router.get('/', authenticationMiddleware, funcionarioApp.getAllFuncionario);
router.get('/InsertFuncionario', authenticationMiddleware, funcionarioApp.insertFuncionario);
router.get('/ViewFuncionarios/:id/:oper', authenticationMiddleware, funcionarioApp.viewFuncionario);

/* POST métodos */
router.post('/InsertFuncionario', authenticationMiddleware, funcionarioApp.insertFuncionario);
router.post('/DeleteFuncionario', authenticationMiddleware, funcionarioApp.DeleteFuncionario);
router.post('/ViewFuncionario', authenticationMiddleware, funcionarioApp.viewFuncionario);

module.exports = router;
