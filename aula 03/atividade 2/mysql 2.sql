CREATE DATABASE IF NOT EXISTS loja1;
USE loja1;

CREATE TABLE IF NOT EXISTS produtos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    quantidade INT
);

select * from produtos
