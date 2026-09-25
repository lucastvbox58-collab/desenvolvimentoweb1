create database if not exists colecao;
use colecao;

CREATE TABLE if not exists filmes ( 
id INT AUTO_INCREMENT PRIMARY KEY,
Titulo VARCHAR(100),
Ano INT );
 
SELECT * FROM filmes
ORDER BY Titulo ASC;