const express = require('express');
const router = express.Router();

const usuariosController = require("../controllers/admin-controllers");

router.get("/", usuariosController.abrirMain);



module.exports = router;
