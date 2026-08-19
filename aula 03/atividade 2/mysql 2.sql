create database if not exists loja1;
use loja1;

create table if not exists compras(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
preco DECIMAL(10,2),
quantidade INT
);

select * from compras
