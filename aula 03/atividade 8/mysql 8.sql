create database if not exists escola2;
use escola2;

CREATE TABLE if not exists cursos ( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 carga_horaria INT 
 );
 
 select * from cursos