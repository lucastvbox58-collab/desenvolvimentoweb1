const mysql = require("mysql2");

//Conexão com mysql
const Conexão = mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "CadastroEmpresa"
})
// dados que seram cadastrados 

const nome = "";
const cargo = "";
const salario = "";

// comandos mysql
const insert = "INSERT INTO funcionarios (nome, cargo, salario) values (?,?)";

// dadso que ream envidados 
Conexão.query(insert,[nome,cargo, salario],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.lof("erro ao cadastrar.");
        console.log(erro);
    }else{
        console.log("Funcionarios cadastrados com sucesso!");
    }
});
// id do cursos que seram deletados 
const id = 6;

const deletar = "delete from funcionarios where id = ?";

Conexão.query(deletar,[id], function (erro, resultado){
    if(erro){
        console.log("Erro ao excluir o funcionario.");
        console.log(erro);
    }else if (resultado.affectedRows === 0){
        console.log("Funcionario não encontrado.");
    }else{
        console.log("Funcionario excluido com sucesso!");
    }
    Conexão.end();
});