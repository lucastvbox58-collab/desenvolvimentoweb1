create database if not exists gerenciamento;
use gerenciamento;

CREATE TABLE clientes ( 
id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100), 
 telefone VARCHAR(20) 
 );
 
 select * from clientes 