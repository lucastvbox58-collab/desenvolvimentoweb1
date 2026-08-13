CREATE DATABASE IF NOT EXISTS escola3;
USE escola3;

CREATE TABLE IF NOT EXISTS diciplinas(
id INT AUTO_INCREMENT PRIMARY KEY,
    nome_diciplina VARCHAR(100) NOT NULL,
	nome_professor VARCHAR(100) NOT NULL,
    aulas_semanais VARCHAR (100) not null
);

SELECT * FROM diciplinas 