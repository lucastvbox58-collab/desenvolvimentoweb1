CREATE DATABASE IF NOT EXISTS loja2;
USE loja2;

CREATE TABLE IF NOT EXISTS vendas(
id INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(100) NOT NULL,
	quantidade int NOT NULL,
    valor float not null
);

SELECT * FROM vendas