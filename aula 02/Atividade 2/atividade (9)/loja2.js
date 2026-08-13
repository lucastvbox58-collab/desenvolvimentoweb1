const mysql = require("mysql2")
 
// Conexão com o Mysql
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loja2"
});
 
// Dados que serão cadastrados
const produto = ""
const quantidade = 0
const valor = 0
 
// Comando SQL
const insert = "INSERT INTO vendas (produto, quantidade, valor) VALUES (?, ?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert,[produto, quantidade, valor], function(erro){
 
    if (erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    } else {
        console.log("Produto cadastrado com sucesso");
    }
});
//ID do Filme que será excluido
const id = 2;
 
const deletar = "DELETE FROM vendas WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado){
 
    if (erro) {
        console.log("Erro ao excluir Produto.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("Produto não encontrado");
        } else {
            console.log("Produto excluido com sucesso!")
        }
    conexao.end();
});