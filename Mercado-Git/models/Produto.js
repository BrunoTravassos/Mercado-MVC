const mongoose = require("mongoose");

const Livros = mongoose.model("Livros", {
  nome_Livro: String,
  num_Edicao: String,
  assunto: String,
  editora: String,
  nome_Autor: String,
  isbn: Number,
  quantidade_Estoque: Number,
  pesquisa: String,
});

module.exports = Livros;
