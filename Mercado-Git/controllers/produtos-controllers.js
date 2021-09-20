const Produtos = require("../models/Produto"); //importando o modelo do banco
// const { admin } = require("../views/helpers/admin");
const bdCon = require("../config/db_connection");
const { query } = require("express");

/* exports.abrirRelatorioLivro = (req, res) => {
   Livros.find({}, (err, lista_livros) => {
     if (err) {
       req.flash("error_msg", "Erro ao listar categorias");
       return res.status(500).send("Erro ao consultar Livro");
     } else {
       res.render("biblioteca/listaLivros", { lista_livros: lista_livros });
     }
   });
}; */

exports.listarProdutos = (req, res) => {
  bdCon.query("SELECT * FROM produtos", (err, produto) => {
    // console.log(produto);
    if (err) throw err;
    res.render("mercado/listaProdutos", { produto });
  });
};

exports.abrirCadastroProdutos = (req, res) => {
  res.render("mercado/cadastrarProdutos");
};

exports.salvarCadastroProdutos = (req, res) => {
  var erros = [];
  if (req.body.nome_Produto == "") {
    erros.push({ texto: "Nome Vazio!!" });
  }
  if (req.body.nome_Produto.length < 3) {
    erros.push({ texto: "Nome do Produto muito pequeno!" });
  }

  if (erros.length > 0) {
    console.log(erros);
    res.render("mercado/cadastrarProdutos", { erros: erros });
  } else {
    // variavel produto recebendo do Model Produto
    let nome_Produto = req.body.nome_Produto;
    let quantidade_Produto = req.body.quantidade_Produto;
    let valor_produto = req.body.valor_produto;
    let codbarras = req.body.codbarras;

    let produto = {
      nome_produto: nome_Produto,
      quantidade_produto: quantidade_Produto,
      valor_produto: valor_produto,
      codbarras: codbarras,
    };

    console.log(produto);

    // livro.save((err) => {
    bdCon.query("INSERT INTO produtos SET ?", produto, function (err, result) {
      if (err) {
        req.flash("error_msg", "Houve um erro ao cadastrar!");
        return res.status(500).send("Erro ao cadastrar");
      } else {
        req.flash("success_msg", "Produto Cadastrado com sucesso!");
        return res.redirect("/listarProdutos");
      }
    });
  }
};

//Alterar
exports.alterarProdutos = (req, res) => {
  var id = req.params.id;
  bdCon.query(
    "SELECT * FROM produtos WHERE id_produto = " + id,
    function (err, produtos, fields) {
      if (err) {
        return res.status(500).send("Erro ao pesquisar produto");
      } else {
        console.log(produtos);
        res.render("mercado/editCadastroProdutos", {
          // lista_produtos: produtos[0]
          id_produto: produtos[0].id_produto,
          nome_produto: produtos[0].nome_produto,
          quantidade_produto: produtos[0].quantidade_produto,
          valor_produto: produtos[0].valor_produto,
          codbarras: produtos[0].codbarras,
        });
      }
    }
  );
};

exports.salvaAlterarProdutos = (req, res) => {
  var id = req.body.id;

  var erros = [];
  if (req.body.nome_Produto == "") {
    erros.push({ texto: "Nome Vazio!!" });
  }
  if (req.body.nome_Produto.length < 3) {
    erros.push({ texto: "Nome do Produto muito pequeno!" });
  }

  if (erros.length > 0) {
    console.log(erros);
    res.render("mercado/editCadastroProdutos", { erros: erros });
  } else {
    // variavel produto recebendo do Model Produto
    let nome_produto = req.body.nome_Produto;
    let quantidade_produto = req.body.quantidade_Produto;
    let valor_produto = req.body.valor_produto;
    let codbarras = req.body.codbarras;

    let produto = {
      nome_produto: nome_produto,
      quantidade_produto: quantidade_produto,
      valor_produto: valor_produto,
      codbarras: codbarras,
    };

    console.log(id);
    console.log(produto);

    bdCon.query(
      "UPDATE produtos SET ? WHERE id_produto = " + id,
      produto,
      function (err, result) {
        if (err) {
          return res.status(500).send("Erro ao Atualizar");
        } else {
          return res.redirect("/listarProdutos");
        }
      }
    );
  }
};

exports.deletarProdutos = (req, res) => {
  var id = req.params.id;

  bdCon.query(
    "DELETE FROM produtos WHERE id_produto = " + id,
    function (err, result) {
      if (err) {
        return res.status(500).send("Erro ao excluir registro");
      } else {
        req.flash("confirm_del", "Produto Excluido com sucesso!");
        res.redirect("/listarProdutos");
      }
    }
  );
};

/* bdCon.query("SELECT * FROM produtos", (err, produto) => {
  // console.log(produto);
  if (err) throw err;
  res.render("mercado/listaProdutos", { produto });
}); */

exports.pesquisarProdutos = (req, res) => {
  let pesquisa = req.query.pesquisar;
  let tipo_pesquisa = req.query.tipo_pesquisa;
  console.log(pesquisa);
  console.log(tipo_pesquisa);

  if (tipo_pesquisa == "Pesquisar por..") {
    qr =
      "SELECT * FROM produtos WHERE '" +
      pesquisa +
      "' IN (nome_produto, quantidade_produto, valor_produto)";
    console.log(qr);
  } else if (tipo_pesquisa == "nome_produto") {
    qr =
      "SELECT * FROM produtos WHERE " + tipo_pesquisa + " = '" + pesquisa + "'";
    console.log(qr);
  } else if (tipo_pesquisa == "valor_produto") {
    qr = "SELECT * FROM produtos WHERE " + tipo_pesquisa + " <= " + pesquisa;
  }
  bdCon.query(qr, (err, produto) => {
    if (err) {
      console.log(produto);
      return res.status(500).send("Erro ao consultar produtos!\n" + err);
    } else {
      console.log(produto);
      // res.send(produto);
      res.render("mercado/listaProdutos", { produto });
    }
  });
};

exports.venderProdutos = (req, res) => {
  var id = req.params.id;
  res.render("mercado/vendas");
  /*  bdCon.query(
    "DELETE FROM produtos WHERE id_produto = " + id,
    function (err, result) {
      if (err) {
        return res.status(500).send("Erro ao excluir registro");
      } else {
        req.flash("confirm_del", "Produto Excluido com sucesso!");
        res.redirect("/listarProdutos");
      }
    }
  ); */
};

exports.pesquisarVendas = (req, res) => {
  let pesquisa = req.query.pesquisar_codbarras;
 
  console.log("Venda" + pesquisa);

  let qry = "SELECT * FROM produtos WHERE codbarras  = '" + pesquisa + "'";
  // console.log(qry);

  bdCon.query(qry, (err, produto) => {
    if (err) {
      // console.log(produto);
      return res.status(500).send("Erro ao consultar produtos!\n" + err);
    } else {
      // console.log(produto);
      // res.send(produto);
      res.render("mercado/vendas", { produto });
    }
  });
};

var id_produto;
var nome_produto;
var quantidade_produto;
var valor_produto;
var codbarras;
var qtd_prd;

exports.criarVenda = (req, res) => {
 
  // Continuar daqui
  let pesquisa = req.body.pesquisar_codbarras;
  qtd_prd = req.body.inserir;
  console.log("pesq" + pesquisa);
  console.log("qtd" + qtd_prd);

  bdCon.query(
    "SELECT * FROM produtos WHERE codbarras = '" + pesquisa + "'",
    function (err, produtos, fields) {
      if (err) {
        return res.status(500).send("Erro ao pesquisar produto");
      } else {
        console.log(produtos);
        id_produto= produtos[0].id_produto;
        nome_produto = produtos[0].nome_produto;
        quantidade_produto = produtos[0].quantidade_produto;
        valor_produto = produtos[0].valor_produto;
        codbarras = produtos[0].codbarras;
      }
      console.log("Val Prod" + valor_produto);
      valTot = qtd_prd * valor_produto;
      console.log("Val Tot" + valTot);
      let itemproduto = {
        id_produto:id_produto,
        nome_produto: nome_produto,
        valor_produto: valor_produto,
        codbarras: codbarras,
        qtd_itens: qtd_prd,
        valor_total: valTot,
      };

      console.log("itemImpo " + itemproduto);
      bdCon.query("INSERT INTO vendas SET ?",itemproduto,function (err, result) {
          if (err) {
            req.flash("error_msg", "Houve um erro ao cadastrar!");
            return res.status(500).send("Erro ao cadastrar");
          } else {
            req.flash("success_msg", "Produto Cadastrado com sucesso!");
            // bdCon.query("SELECT * FROM vendas", (err, produtovenda) => {
            bdCon.query(
              "SELECT * FROM vendas WHERE id_venda=(SELECT max(id_venda) FROM vendas)",
              (err, produtovenda) => {
                // console.log(produto);
                if (err) throw err;
                res.render("mercado/vendas", { produtovenda });
              }
            );
          }
        }
      );
    }
    
  );

    


};

exports.atualizarProdutos = (req, res) => {
  let id = req.query.id;
  let quantidade_produto_vendido = req.query.qtd_produto;
  console.log(id);
  console.log(quantidade_produto);
    bdCon.query(
      "SELECT * FROM produtos WHERE id_produto = " + id ,
      function (err, produtos, fields) {
        if (err) {
          return res.status(500).send("Erro ao pesquisar produto");
        } else {
          console.log(produtos);
          id_produto = produtos[0].id_produto;
          nome_produto = produtos[0].nome_produto;
          quantidade_produto = produtos[0].quantidade_produto;
          valor_produto = produtos[0].valor_produto;
          codbarras = produtos[0].codbarras;
        }
        
      let   qtdProd = quantidade_produto - quantidade_produto_vendido;

        console.log("Qtd prod" + qtdProd);

        let atualizaproduto = {
          quantidade_produto: qtdProd,
          };

        console.log("atualiza " + atualizaproduto);
        bdCon.query(
          "UPDATE produtos SET ? WHERE id_produto = " + id, atualizaproduto,         
          function (err, result) {
            if (err) {
              req.flash("error_msg", "Houve um erro ao cadastrar!");
              return res.status(500).send("Erro ao cadastrar");
            } else {
              req.flash("success_msg", "Produto Atualizado com sucesso!");
                  res.render("mercado/vendas");
                }
            
            });
      }
    );

    
};
