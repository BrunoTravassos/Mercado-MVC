const express = require("express");
const router = express.Router();

const produtosController = require("../controllers/produtos-controllers");

// router.get("/cadastroLivros", livrosController.abrirCadastroLivro);
router.get("/", produtosController.listarProdutos);

 router.get("/pesquisar/:tipo_pesquisa", produtosController.pesquisarProdutos
);
 
// router.get("/pesquisarVenda/:codbarras", produtosController.pesquisarVendas); 


router.get("/cadastroProdutos", produtosController.abrirCadastroProdutos);

router.post("/cadastroProdutos/novo", produtosController.salvarCadastroProdutos);

router.post("/editarProdutos", produtosController.salvaAlterarProdutos);

router.post("/addProdutos/novo", produtosController.criarVenda);

router.get("/editarProdutos/:id", produtosController.alterarProdutos);

// router.post("/inserirProduto/", produtosController.criarVenda);
// router.post("/addProduto/novo/", produtosController.criarVenda);

router.get("/deletarProdutos/:id", produtosController.deletarProdutos);

router.get("/finalizarProdutos/:id", produtosController.atualizarProdutos);

router.get("/vendas", produtosController.venderProdutos);

module.exports = router;