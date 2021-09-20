//Carregando modulos
const express = require('express');
var mysql = require("mysql");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
// const admin_router = require("./routes/admin-router");
const produtos_router = require("./routes/produtos-router");
const usuarios = require("./routes/usuarios-router");
const path = require('path');

const session = require("express-session");
const flash = require("connect-flash");

//Sessão
app.use(
  session({
    secret: "teste",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
//   res.locals.user = req.user || null;
  next();
});

//Config
    //BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    //HandleBars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');
//Mongoose
/* mongoose.connect(
  "mongodb+srv://bruno_travassos:bruno_travassos@cluster0.301t5.mongodb.net/biblioteca?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
 */

app.get("/", (req, res) => res.render("mercado/index"));
//Public arquivos estaticos estão no dir: public
app.use(express.static(path.join(__dirname,'public')))

//Chamar Rotas

// app.use("/", admin_router);
app.use("/", produtos_router);

app.use("/listarProdutos", produtos_router);

app.use("/cadastroProdutos", produtos_router);
app.use("/addProdutos", produtos_router);
app.use("/registros", usuarios);

// app.use("/pesquisarProdutos", produtos_router);


// app.get('/', (req, res) => res.send('index'))

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port port!`))