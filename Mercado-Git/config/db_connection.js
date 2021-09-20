var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost", //ou 127.0.0.1
  user: "user",
  password: "user",
  database: "mercado",
  charset: "utf8",
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado!");
});

module.exports = con;