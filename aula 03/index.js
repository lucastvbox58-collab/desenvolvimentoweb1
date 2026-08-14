const mysql = require("mysql2");
const readline = require("readline-sync");

// conexao com mysql
const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"escola"
});

// funcao para cadastrar aluno
function cadastrarAluno(){

    const nome = readline.question("Digite o nome do aluno:");
    const email = readline.question("Digite o email do aluno:");

    const insert = "INSERT INTO alunos (nome, email) VALUES(?,?)";

    conexao.query(insert, [nome, email], function(erro) {
        if (erro){
            console.log("Erro ao cadastrar.");
            console.log(erro);
        }else{
            console.log("Alunos casdastrados com sucesso!");
        }
        // menu();
    });
}
cadastrarAluno();

// funcao para excluir aluno 
function excluirAluno(){

    const id = readline.questionInt("digite o id do aluno");

    const deletar = "DELETE FROM alunos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
        
    }
}