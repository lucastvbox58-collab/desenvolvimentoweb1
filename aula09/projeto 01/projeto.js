
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_produtos'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection.connect(function (err) {
    if (err) {
        console.error("Erro ao conectar ao banco:", err);
        return;
    }

    console.log("Conectado ao banco de dados!");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/cadProduto.html");
});

app.post("/adicionar", function (req, res) {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;

    const insert = `
        INSERT INTO produtos (nome, quantidade, preco)
        VALUES (?, ?, ?)
    `;

    const values = [nome, quantidade, preco];

    connection.query(insert, values, function (err, result) {
        if (err) {
            console.error("Dados não inseridos:", err);
            res.status(500).send("Erro ao cadastrar produto!");
        } else {
            console.log("Dados inseridos com sucesso!");
            res.redirect("/listar");
        }
    });
});

app.get("/listar", function (req, res) {
    const selectAll = "SELECT * FROM produtos";

    connection.query(selectAll, function (err, rows) {
        if (err) {
            console.error("Erro ao listar os produtos:", err);
            res.status(500).send("Erro ao listar os produtos!");
            return;
        }

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lista de Produtos</title>
            </head>
            <body>
                <h1>Lista de Produtos</h1>

                <table border="1">
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Deletar</th>
                        <th>Alterar</th>
                    </tr>

                    ${rows.map(row => `
                        <tr>
                            <td>${row.codigo}</td>
                            <td>${row.nome}</td>
                            <td>${row.quantidade}</td>
                            <td>R$ ${row.preco}</td>
                            <td>
                                <a href="/deletar/${row.codigo}">Deletar</a>
                            </td>
                            <td>
                                <a href="/atualizar-form/${row.codigo}">Alterar</a>
                            </td>
                        </tr>
                    `).join('')}
                </table>

                <br>
                <a href="/">Cadastrar novo produto</a>
            </body>
            </html>
        `);
    });
});

app.get("/deletar/:id", function (req, res) {
    const idDoProduto = req.params.id;

    const deleteProduto = `
        DELETE FROM produtos
        WHERE codigo = ?
    `;

    connection.query(deleteProduto, [idDoProduto], function (err, result) {
        if (err) {
            console.error("Erro ao excluir produto:", err);
            res.status(500).send("Erro ao excluir produto!");
        } else {
            console.log("Produto excluído com sucesso!");
            res.redirect("/listar");
        }
    });
});

app.get("/atualizar-form/:id", function (req, res) {
    const id = req.params.id;

    const selectProduto = `
        SELECT *
        FROM produtos
        WHERE codigo = ?
    `;

    connection.query(selectProduto, [id], function (err, result) {
        if (err) {
            console.error("Erro ao obter dados do produto:", err);
            res.status(500).send("Erro ao obter dados do produto!");
            return;
        }

        if (result.length === 0) {
            res.status(404).send("Produto não encontrado!");
            return;
        }

        const produto = result[0];

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atualizar Cadastro de Produtos</title>
            </head>
            <body>
                <h1>Atualizar Cadastro de Produtos</h1>

                <form action="/atualizar/${produto.codigo}" method="POST">
                    <label for="nome">Nome do Produto</label>
                    <br>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value="${produto.nome}"
                        required
                    >
                    <br><br>

                    <label for="quantidade">Quantidade</label>
                    <br>
                    <input
                        type="number"
                        id="quantidade"
                        name="quantidade"
                        value="${produto.quantidade}"
                        required
                    >
                    <br><br>

                    <label for="preco">Preço</label>
                    <br>
                    <input
                        type="number"
                        id="preco"
                        name="preco"
                        step="0.01"
                        value="${produto.preco}"
                        required
                    >
                    <br><br>

                    <input type="submit" value="Atualizar">
                </form>

                <br>
                <a href="/listar">Listar produtos</a>
            </body>
            </html>
        `);
    });
});

app.post("/atualizar/:id", function (req, res) {
    const nome = req.body.nome;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;
    const id = req.params.id;

    const update = `
        UPDATE produtos
        SET nome = ?,
            preco = ?,
            quantidade = ?
        WHERE codigo = ?
    `;

    connection.query(
        update,
        [nome, preco, quantidade, id],
        function (err, result) {
            if (err) {
                console.error("Erro ao atualizar:", err);
                res.status(500).send("Erro ao atualizar!");
            } else {
                console.log("Dados atualizados com sucesso!");
                res.redirect("/listar");
            }
        }
    );
});

app.listen(8083, function () {
    console.log("Servidor rodando na URL http://localhost:8083");
});