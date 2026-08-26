CREATE DATABASE IF NOT EXISTS cadastro;

USE cadastro;

CREATE TABLE IF NOT EXISTS alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    endereco VARCHAR(100),
    matricula VARCHAR(100),
    curso VARCHAR(100),
    serie VARCHAR(100)
);

SELECT * FROM alunos;