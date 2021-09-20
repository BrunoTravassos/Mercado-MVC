USE mercado;
DROP TABLE produtos;
DROP TABLE usuarios;
DROP TABLE vendas;

CREATE TABLE IF NOT EXISTS produtos(
  id_produto INT NOT NULL AUTO_INCREMENT,
  nome_produto VARCHAR(40)  NOT NULL,
  quantidade_produto INTEGER NOT NULL,
  valor_produto FLOAT  NOT NULL,
  PRIMARY KEY(id_produto)
)DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS vendas(
id_venda INT NOT NULL AUTO_INCREMENT,
id_prod INT  NOT NULL,
quantidade_produto INTEGER NOT NULL,
valor_total FLOAT NOT NULL ,
PRIMARY KEY(id_venda),
FOREIGN KEY(id_prod) REFERENCES produtos(id_produto)
)DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS usuarios(
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50)  NOT NULL,
  email VARCHAR (50) NOT NULL,
  senha VARCHAR (20) NOT NULL,
  tipo VARCHAR (2) NOT NULL,
  PRIMARY KEY(id_usuario)
)DEFAULT CHARSET=utf8;
INSERT INTO
  produtos(nome_produto,quantidade_produto,valor_produto)
VALUES(
    'Refrigerante',
    10,
    3.55
  ),
  (
    'Pão de Forma',
    78,
    5.55
  ),
  (
    'Arroz',
    65,
    7.80
  ),
  (
    'Feijão',
    10,
    8.70
  );
INSERT INTO
  usuarios(nome, email, senha,tipo)
VALUES
  (
    "Bruno de Frontin Travassos",
    "brunodefrontin@gmail.com",
    "1234",
    "1"
  );