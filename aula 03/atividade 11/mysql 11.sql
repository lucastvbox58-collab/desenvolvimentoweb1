create database if not exists sistemasEventos;
use sistemasEventos;

CREATE TABLE if not exists eventos( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 data_evento DATE 
 );
 select * from eventos
 