create database if not exists colecao;
use colecao;

CREATE TABLE filmes ( 
id INT AUTO_INCREMENT PRIMARY KEY,
titulo VARCHAR(100),
ano INT );
 
 select * from filmes