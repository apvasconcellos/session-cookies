const express = require('express');
const LoginController = require('../controllers/LoginController');
const verificarUsuarioLogado = require('../middlewares/verificarUsuarioLogado');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  let usuario;
  let tema = req.cookies.tema ? req.cookies.tema : "light-mode";
  
  if (req.session.usuario) {
    usuario = req.session.usuario;
  }
  
  res.render('index', { title: 'Página Inicial', usuario, tema });
});

router.get('/feed', verificarUsuarioLogado, function(req, res, next) {
  res.render('feed', { usuario: req.session.usuario });
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});

router.post("/cadastro", function(req, res, next) {
  const { nome, email, senha, tema } = req.body;

  const { senha: senhaNaoUsada, ...usuario } = LoginController.criarUsuario(nome, email, senha);

  req.session.usuario = usuario;

  res.cookie("tema", tema);

  res.redirect('/feed');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });


});
router.post('/login', function(req, res, next) {
  const { email, senha } = req.body
  
  
    res.redirect('/');
  });

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
