create database if not exists laboratorio_avaliacao;
use laboratorio_avaliacao;

CREATE TABLE if not exists computadores( 
 id INT AUTO_INCREMENT PRIMARY KEY,
 patrimonio VARCHAR(50),
 localizacao VARCHAR(100),
 responsavel varchar(100),
 situacao varchar(30)
 );
 
 select * from  computadores