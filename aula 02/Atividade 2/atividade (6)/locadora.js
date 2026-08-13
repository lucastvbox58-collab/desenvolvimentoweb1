const mysql = require("mysql2");

//Conexão com mysql
const Conexão = mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "LOCADORA"
})
// dados que seram cadastrados 

const titulo = "";
const ano = "";

// comandos mysql
const insert = "INSERT INTO filmes (titulo, ano) values (?,?)";

// dadso que ream envidados 
Conexão.query(insert,[titulo,ano],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.log("erro ao cadastrar.");
        console.log(erro);
    }else{
        console.log("Filme cadastrados com sucesso!");
    }
});
// id dos clientes que seram deletados 
const id = 2;

const deletar = "delete from filmes where id = ?";

Conexão.query(deletar,[id], function (erro, resultado){
    if(erro){
        console.log("Erro ao excluir o filme.");
        console.log(erro);
    }else if (resultado.affectedRows === 0){
        console.log("Filme não encontrado.");
    }else{
        console.log("Filme excluido com sucesso!");
    }
    Conexão.end();
});