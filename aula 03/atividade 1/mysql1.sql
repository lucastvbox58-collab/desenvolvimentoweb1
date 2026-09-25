create database if not exists escola;
use escola;

CREATE TABLE if not exists alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    matricula VARCHAR(50) NOT NULL,
    curso VARCHAR(50) NOT NULL,
    Serie VARCHAR(20) NOT NULL
);

select * from alunos