CREATE DATABASE IF NOT EXISTS CadastroEmpresa;
USE CadastroEmpresa;

CREATE TABLE IF NOT EXISTS funcionarios(
id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	cargo VARCHAR(100) NOT NULL,
    salario float not null
);

SELECT * FROM funcionarios 