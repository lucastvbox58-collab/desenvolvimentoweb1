create database if not exists laboratorio;
use laboratorio;

CREATE TABLE if not exists computadores( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 patrimonio VARCHAR(50),
 localizacao VARCHAR(100) 
 );
 
 select * from computadores