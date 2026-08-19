create database if not exists empresa1;
use empresa1;

CREATE TABLE if not exists funcionarios ( 
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
cargo VARCHAR(100) 
);
 
 select * from funcionarios