CREATE DATABASE IF NOT EXISTS e_comerce;

USE e_comerce;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_do_produto VARCHAR(100) NOT NULL,
    valor_do_produto DECIMAL(10,2) NOT NULL
);

SELECT * FROM produtos;