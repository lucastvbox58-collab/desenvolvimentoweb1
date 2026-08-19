create database if not exists sistemasVeiculos;
use sistemasVeiculos;

CREATE TABLE if not exists veiculos( 
id INT AUTO_INCREMENT PRIMARY KEY,
 modelo VARCHAR(100),
 placa VARCHAR(20) 
 );
 select * from veiculos
 