var express = require('express');
var router = express.Router();
var contareceberApp = require("../app/contareceber/controller/ctlContaReceber");



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
router.get('/ManutContaReceber', authenticationMiddleware, contareceberApp.manutContaReceber);
router.get('/InsertContaReceber', authenticationMiddleware, contareceberApp.insertContaReceber);
router.get('/ViewContaReceber/:id', authenticationMiddleware, contareceberApp.ViewContaReceber);
router.get('/UpdateContaReceber/:id', authenticationMiddleware, contareceberApp.UpdateContaReceber);

/* POST métodos */
router.post('/InsertContaReceber', authenticationMiddleware, contareceberApp.insertContaReceber);
router.post('/UpdateContaReceber', authenticationMiddleware, contareceberApp.UpdateContaReceber);
router.post('/DeleteContaReceber', authenticationMiddleware, contareceberApp.DeleteContaReceber);

module.exports = router;