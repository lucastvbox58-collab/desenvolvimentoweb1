const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_alunos'
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

connection.connect(function (err){
    if (err) {
        console.log("Erro ao conectar ao Banco:", err);
        return;
    }
    console.log("Conectado ao Banco de Dados!");
});

app.get("/", function (req, res){
    res.sendFile(__dirname + "/paginainicial.html");
});
app.get("/cadastro", function(req,res){
    res.sendFile(__dirname + "/cad_Alunos.html")
})
app.post("/adicionar", function (req, res) {
    const nome = req.body.nome;
    const gmail = req.body.gmail;
    const idade = req.body.idade;
    const turma = req.body.turma;

    const sql = `
    INSERT INTO alunos (nome, gmail, idade, turma)
    VALUES (?, ?, ?, ?)
`;

    const valores = [nome, gmail, idade, turma];

    connection.query(sql, valores, function (err, result) {
        if (err) {
            console.log("Erro ao cadastrar aluno:", err);
            return res.status(500).send("Erro ao cadastrar aluno!");
        }

        console.log("Aluno cadastrado com sucesso!");
        res.redirect("/listar");
    });
});

app.get("/listar",function(req,res){
    const sql = "SELECT * FROM alunos";

    connection.query(sql, function (err, rows){
        if (err){
            console.log("Erro ao Listar ao alunos:", err);
            res.status(500).send("Erro ao listar alunos!");
            return;
        }
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Lista de Alunos</title>
            <style>
                    body {
                        background-color: rgb(117, 117, 117);
                        color: white;
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }

                    h1 {
                        color: rgba(0, 195, 255, 0.9);
                        text-align: center;
                    }

                    .container {
                        background-color: rgb(37, 37, 37);
                        padding: 25px;
                        border-radius: 12px;
                        overflow-x: auto;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }

                    th, td {
                        border: 1px solid #666;
                        padding: 12px;
                        text-align: left;
                    }

                    th {
                        background-color: rgb(55, 55, 55);
                        color: rgba(0, 195, 255, 0.9);
                    }

                    a {
                        color: #00c3ff;
                        text-decoration: none;
                    }

                    a:hover {
                        color: white;
                    }

                    .botao {
                        display: inline-block;
                        background-color: rgb(55, 55, 55);
                        color: white;
                        padding: 12px 18px;
                        border-radius: 8px;
                        margin-top: 20px;
                    }

                    .botao:hover {
                        background-color: rgb(0, 110, 255);
                    }
                </style>
            </head>

            <body>
                <h1>Lista de Alunos</h1>

                <div class="container">
                    <table>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Idade</th>
                            <th>Turma</th>
                            <th>Deletar</th>
                            <th>Alterar</th>
                        </tr>

                        ${rows.map(row => `
                            <tr>
                                <td>${row.codigo}</td>
                                <td>${escapeHtml(row.nome)}</td>
                                <td>${escapeHtml(row.gmail)}</td>
                                <td>${row.idade}</td>
                                <td>${escapeHtml(row.turma)}</td>
                                <td>
                                    <a href="/deletar/${row.codigo}"
                                       onclick="return confirm('Deseja excluir este aluno?')">
                                        Deletar
                                    </a>
                                </td>
                                <td>
                                    <a href="/atualizar-form/${row.codigo}">
                                        Alterar
                                    </a>
                                </td>
                            </tr>
                        `).join('')}
                    </table>

                    <a class="botao" href="/">Cadastrar novo aluno</a>
                </div>
            </body>
            </html>
        `);
    });
});
function escapeHtml(valor) {
    return String(valor ?? '').replace(/[&<>"']/g, function (caractere) {
        const entidades = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return entidades[caractere];
    });
}
app.get("/deletar/:id", function (req, res){
    const idDoAluno = req.params.id;

    const deletarAluno =`
          DELETE FROM alunos
          WHERE codigo = ?
    `;
    connection.query(deletarAluno, [idDoAluno], function (err, result){
        if (err){
            console.error("Erro ao excluir aluno:", err);
            res.status(500).send("Erro ao excluir Aluno!");
        } else {
            console.log("Aluno excluido com sucesso!!")
            res.redirect("/listar");
        }
    });
});
app.get("/atualizar-form/:id", function(req,res){
    const id = req.params.id;
    const selectAluno = `
          SELECT * FROM alunos WHERE codigo = ?
    `;

    connection.query(selectAluno,[id], function (err, result){
        if(err){
            console.error("Erro ao obter dados do Aluno:", err);
            res.status(500).send("Erro ao obter dados do Aluno!");
            return;
        }
        if(result.length === 0){
            res.status(404).send("Aluno não encontrado!");
            return;
        }
        const aluno = result[0];

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Atualizar Cadastro</title>

                <style>
                    body {
                        background-color: rgb(117, 117, 117);
                        color: white;
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }

                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        padding: 30px;
                        background-color: rgb(37, 37, 37);
                        border-radius: 12px;
                    }

                    h1 {
                        color: rgba(0, 195, 255, 0.9);
                        text-align: center;
                    }

                    label {
                        display: block;
                        margin-top: 15px;
                    }

                    input {
                        width: 100%;
                        padding: 12px;
                        margin-top: 8px;
                        box-sizing: border-box;
                        border: none;
                        border-radius: 6px;
                    }

                    button {
                        width: 100%;
                        margin-top: 25px;
                        padding: 13px;
                        background-color: rgb(0, 110, 255);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                    }

                    a {
                        display: inline-block;
                        margin-top: 20px;
                        color: #00c3ff;
                    }
                </style>
            </head>

            <body>
                <div class="container">
                    <h1>Atualizar Cadastro de Aluno</h1>

                    <form action="/atualizar/${aluno.codigo}" method="POST">

                        <label for="nome">Nome do aluno:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value="${escapeHtml(aluno.nome)}"
                            required
                        >

                        <label for="gmail">E-mail:</label>
                        <input
                            type="email"
                            id="gmail"
                            name="gmail"
                            value="${escapeHtml(aluno.gmail)}"
                            required
                        >

                        <label for="idade">Idade:</label>
                        <input
                            type="number"
                            id="idade"
                            name="idade"
                            min="1"
                            max="120"
                            value="${aluno.idade}"
                            required
                        >

                        <label for="turma">Turma:</label>
                        <input
                            type="text"
                            id="turma"
                            name="turma"
                            value="${escapeHtml(aluno.turma)}"
                            required
                        >

                        <button type="submit">Atualizar cadastro</button>
                    </form>

                    <a href="/listar">Voltar para a lista de alunos</a>
                </div>
            </body>
            </html>
        `);
    });
});

app.post("/atualizar/:id", function (req, res) {
    const id = req.params.id;
    const nome = req.body.nome;
    const gmail = req.body.gmail;
    const idade = req.body.idade;
    const turma = req.body.turma;

      const sql = `
        UPDATE alunos
        SET nome = ?, gmail = ?, idade = ?, turma = ?
        WHERE codigo = ?
    `;

        const valores = [nome, gmail, idade, turma, id];


    connection.query(sql, valores,
       function (err, result) {
            if (err) {
                console.log("Erro ao atualizar aluno:", err);
                return res.status(500).send("Erro ao atualizar aluno!");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Aluno não encontrado!");
            }

            console.log("Dados atualizados com sucesso!");
            res.redirect("/listar");
        }
    );
});

app.listen(8083, function () {
    console.log("Servidor rodando em http://localhost:8083");
});