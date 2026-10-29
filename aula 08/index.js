// Conexão com mysql

const mysql = require('mysql2');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud'
});

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));

app.listen(8083, function(){
    console.log("Servidor rodando na url http://localhost:8083");
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/cadProduto.html")
});
app.post("/adicionar",function(req, res){
  const nome = req.body.nome;
  const preco = req.body.preco;
  const quantidade = req.body.quantidade;
  
  const values = [nome,quantidade,preco];
  const insert = "INSERT INTO produtos (nome,quantidade,preco)values(?,?,?)";
   
  connection.query(insert,[nome,preco,quantidade],function(err, resultado){
    if (err){
        console.error("Dados não inseridos", err);
        res.send("Erro");
    }else{
        console.log("Dados inseridos com sucesso!");
        res.redirect("/listar");
    }
  });
});
app.get("/listar",function(req, res){
    const selectAll = "SELECT * FROM produtos";

    connection.query(selectAll, function(err, rows){
        if(!err){
            res.send(`<html>
                    <head>
                        <title> Lista de produtos </title>
                    </head>
                    <body>
                        <h1> Lista de produtos</h1>
                        <table>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                        </tr>
                        ${rows.map(row=>`
                        <tr>
                            <td>${row.nome}</td>
                            <td>${row.quantidade}</td>
                            <td>${row.preco}</td>
                            <td><a href="/deletar/${row.id}">Deletar</a></td>
                            <td><a href="/atualizar-form/${row.id}">Alterar</a></td>
 
                            </tr>`).join('')}
                    </table>
                    <br><br>
                         <a href="/">Cadastrar novo produto</a>
                    </body>
 
                </html>`);
                        }else{
                            console.error("Erro ao listar os produtos",err);
                            res.status(500).send("Erro ao listar os dados");
        }
   });
});
app.get("/deletar/:id", function(req,res){
    const idDoProduto =req.params.id;
    const deletarProduto = "DELETE FROM produtos WHERE id=?";

    connection.query(deletarProduto,[idDoProduto],(err,rows) => {
        if(!err){
            console.log("Produto excluido com sucesso");
            res.redirect("/listar");
        }else{
            console.error("Erro ao excluir produto",err);
            res.status(500).send("Erro ao excluir produto!");
        }
    });
});
app.post("/atualizar/:id",(req,res) =>{

    const update="UPATE produtosSET nome= ?, preco= ?,quantidade = ?, WHERE id = ?";
    const nome = req.body.name;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;
    const id = req.params.id;

    connection.query(update, [nome, preco, quantidade, id], function (err, result){
        if(!err){
            console.log("Dados Atualizados com Sucesso!");
            res.send("Dados Atualizados");
        }else{
            console.log("Erro ao atualizar!", err);
            res.status(500).send("Erro ao atualizar!");
        }
    });
});
app.post("/atualizar-form/:id", function(req,res){
    const id = req.params.id;
    const selectProdutos= ("SELECT * FROM produtos WHERE id=?")

    connection.query(selectProdutos, [id], function(err, result){
        if(!err && result.legth >0){
            const produto = result[0];
            res.send(`
                <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="vieport" content="windth=device-width,initial-scarle=1.0">
        <title>Atualizar Cadastro de Produtos</title>
    </head>     
    <body>
    <h1>Atualizar Cadastro de Produtos</h1>
    
        <form action"/atualizar/${id}" method="POST">
        <label for="nome"> Nome do Produto</label><br>
        <input type="text"id="nome" name="nome" values=${produto.nome}required> <br>
        <br>
        <label for="quantidade">Qanidade</label> <br>
        <input type="number" id="quantidade" name="quantidade"value=${produto.quantidade}required> <br>
        <br>
        <label for=preco>Preço</label><br>
        <input type="number" id="preco} required> <br>
        <input type="Submit">
        <br>
        <a href="/listar">Listar produtos</a>
    </form>
    </body.
    </html`)
        }else{
            console.log("Erro ao obter odados do produto", err);
            res.status(500).send("Erro ao obter dados do produto");
        }
    });
});