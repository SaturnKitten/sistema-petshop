var express =require('express');
var alunosApp =require("../app/funcionario/controller/ctlFuncionario")
var router = express.Router();

functionauthenticationMiddleware(req, res,next) {

isLogged= req.session.isLogged;

if(!isLogged) {
  res.redirect("/Login");
 }
();
};
 
router.get('/',authenticationMiddleware, funcionarioApp.getAllFuncionario);
router.get('/InsertFuncionario',authenticationMiddleware, funcionarioApp.insertFuncionario);
router.get('/ViewFuncionarios/:id/:oper',authenticationMiddleware, funcionarioApp.viewFuncionario);

router.post('/InsertFuncionario',authenticationMiddleware, funcionarioApp.insertFuncionario);
router.post('/DeleteFuncionario',authenticationMiddleware, funcionarioApp.DeleteFuncionario);
router.post('/ViewFuncionario',authenticationMiddleware, funcionarioApp.viewFuncionario);

 module.exports = router;
