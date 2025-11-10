var express = require('express');
var router = express.Router();
var alunosApp = require("../apps/contareceber/controller/ctlContaReceber");



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
router.get('/ManutContaReceber', authenticationMiddleware, alunosApp.manutContaReceber);
router.get('/InsertContaReceber', authenticationMiddleware, alunosApp.insertContaReceber);
router.get('/ViewContaReceber/:id', authenticationMiddleware, alunosApp.ViewContaReceber);
router.get('/UpdateContaReceber/:id', authenticationMiddleware, alunosApp.UpdateContaReceber);

/* POST métodos */
router.post('/InsertContaReceber', authenticationMiddleware, alunosApp.insertContaReceber);
router.post('/UpdateContaReceber', authenticationMiddleware, alunosApp.UpdateContaReceber);
router.post('/DeleteContaReceber', authenticationMiddleware, alunosApp.DeleteContaReceber);

module.exports = router;