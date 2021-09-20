const express = require('express');
const router = express.Router();


const usuariosController = require("../controllers/usuarios-controller");



router.get("/", usuariosController.abrirRegistroLogin);

router.get("/login", usuariosController.loginUsuario);

router.get("/logout", usuariosController.logoutUsuario);

router.post("/cadastrarUsuarios", usuariosController.salvarLogin);

router.post("/login", usuariosController.fazerLogin);



module.exports = router