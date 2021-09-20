// const Livros = require("../models/livros-model"); //importando o modelo do banco
// const { admin } = require("../views/helpers/admin");


exports.abrirMain =  (req, res) => {
    res.render("biblioteca/index");
};
  

