const mysql = require("mysql2");

// Conexão com  MySQL
const conexao =  mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "escola"
});
// dados que seram cadastrados 

const nome = "marcio";
const email = "soprafrente@gmail.com";


// comando mysql
const insert = "INSERT INTO alunos (nome, email)values (?,?)";

// dados que seram enviados 
conexao.query(insert,[nome,email],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.log("erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Alunos cadastrados com sucesso!");
    }
});

// id do aluno que sera deletado
const id = 2;

const deletar = "delete from alunos where id = ?";

conexao.query(deletar, [id], function (erro, resultado){
    if (erro){
        console.log("Erro ao excluir o aluno.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("Aluno não encontrado.");
    } else {
        console.log("Aluno excluído com sucesso!");
    }
    conexao.end();
});

    


