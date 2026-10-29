CREATE DATABASE IF NOT EXISTS crud_produtos;
USE crud_produtos;

CREATE TABLE IF NOT EXISTS Produtos(
código INT auto_increment PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
quantidade INT NOT NULL,
preço decimal not null
);
INSERT INTO produtos (nome, quantidade, preço)
VALUES
    ('Notebook Lenovo IdeaPad 3',50, 2899.90),
    ('Notebook Acer Aspire 5',10, 3299.90),
    ('Notebook Dell Inspiron 15',1, 4199.90);
    
SELECT * FROM produtos;

DESCRIBE produtos;

ALTER TABLE produtos
MODIFY COLUMN preço DECIMAL(10,2) NOT NULL;

UPDATE produtos
SET preço = 2899.90
WHERE nome = 'Notebook Lenovo IdeaPad 3';

UPDATE produtos
SET preço = 3299.90
WHERE nome = 'Notebook Acer Aspire 5';

UPDATE produtos
SET preço = 4199.90;

SELECT * FROM produtos;
