var express = require('express');
var router = express.Router();
var recebimentoApp = require("../app/Recebimento/controller/ctlRecebimento")




function authenticationMiddleware(req, res, next) {
    
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
      res.redirect("/Login");
    }
    next();
}; 
  
/* GET métodos */
router.get('/InsertRecebimento', authenticationMiddleware, recebimentoApp.insertRecebimento);
router.get('/ViewRecebimento/:id', authenticationMiddleware, recebimentoApp.viewRecebimento);
//router.get('/UpdateRecebimento/:id', authenticationMiddleware, recebimentoApp.UpdateRecebimento);

/* POST métodos */
router.post('/InsertRecebimento', authenticationMiddleware, recebimentoApp.insertRecebimento);
//router.post('/UpdateRecebimento', authenticationMiddleware, recebimentoApp.UpdateRecebimento);
router.post('/DeleteRecebimento', authenticationMiddleware, recebimentoApp.DeleteRecebimento);



module.exports = router;
