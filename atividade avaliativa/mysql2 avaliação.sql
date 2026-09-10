create database if not exists laboratorio01;
use laboratorio01;

CREATE TABLE if not exists computadores( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 patrimonio VARCHAR(50),
 localizacao VARCHAR(100),
 responsavel varchar(100),
 status varchar(30)
 );
 
 select * from  computadores