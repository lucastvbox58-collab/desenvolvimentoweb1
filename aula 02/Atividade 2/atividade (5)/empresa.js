const mysql = require("mysql2");

//Conexão com mysql
const Conexão = mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "EMPRESA"
})
// dados que seram cadastrados 

const nome_do_cliente = "";
const telefone_do_cliente = "";

// comandos mysql
const insert = "INSERT INTO CLIENTES (nome_do_cliente, telefone_do_cliente) values (?,?)";

// dadso que ream envidados 
Conexão.query(insert,[nome_do_cliente,telefone_do_cliente],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.log("erro ao cadastrar.");
        console.log(erro);
    }else{
        console.log("Clientes cadastrados com sucesso!");
    }
});
// id dos clientes que seram deletados 
const id = 2;

const deletar = "delete from clientes where id = ?";

Conexão.query(deletar,[id], function (erro, resultado){
    if(erro){
        console.log("Erro ao excluir o cliente.");
        console.log(erro);
    }else if (resultado.affectedRows === 0){
        console.log("Cliente não encontrado.");
    }else{
        console.log("Cliente excluido com sucesso!");
    }
    Conexão.end();
});