create database if not exists biblioteca1;
use biblioteca1;

create table if not exists livros(
id INT AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(150),
 autor VARCHAR(100) 
 );

select * from livros
