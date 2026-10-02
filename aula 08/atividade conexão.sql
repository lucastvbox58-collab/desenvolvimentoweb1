CREATE DATABASE if not exists crud;
USE crud;
 
CREATE TABLE if not exists produtos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);
 
SELECT * FROM produtos;