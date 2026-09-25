create database if not exists sistemaSimples;
use sistemaSimples;

CREATE TABLE if not exists Tarefas ( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 descricao VARCHAR(200),
 responsavel VARCHAR(100) 
 );
 
 select * from Tarefas