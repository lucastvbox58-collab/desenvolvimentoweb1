create database if not exists games;
use games;

CREATE TABLE jogos ( 
id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 genero VARCHAR(50)
 );
 
 select * from jogos