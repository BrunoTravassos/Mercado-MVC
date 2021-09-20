const passport = require("passport");
const Usuarios = require("../models/usuario-model"); //importando o modelo do banco
const flash = require("connect-flash");
const bdCon = require("../config/db_connection");
const { query } = require("express");

/* app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
}); */

exports.abrirRegistroLogin = (req, res) => {
  res.render("usuarios/registro");
};

exports.loginUsuario = (req, res) => {
  res.render("usuarios/login");
};
exports.logoutUsuario = (req, res) => {
  req.logout();
  req.flash("success_msg", "deslogado com sucesso");
  res.redirect("/");
};

exports.salvarLogin = (req, res) => {
  let nome = req.body.nome;
  let email = req.body.email;
  let senha = req.body.senha;
  let tipo = 1;

  let usuario = {
    nome: nome,
    email: email,
    senha: senha,
    tipo:tipo,
  };
  console.log(usuario); 
  // usuario.save((err) => {
    bdCon.query('INSERT INTO usuarios SET ?', usuario, function (err, result) {
    if (err) {
      return res.status(500).send("Erro ao cadastrar");
    } else {
      req.flash("success_msg", "Usuario Cadastrado com sucesso!");
      return res.redirect("/registros");
    }
  });
};

exports.fazerLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/registros/login",
    failureFlash: true,
  })(req, res, next);
};
