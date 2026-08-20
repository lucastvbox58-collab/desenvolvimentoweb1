const mysql = require("mysql2");
const readline = require("readline-sync");

// conexao com mysql
const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"cadastro"
});

// funcao para cadastrar aluno
function cadastrarAluno() {

    const nome = readline.question("Digite o nome do aluno: ");
    const email = readline.question("Digite o email do aluno: ");
    const endereco = readline.question("Digite o endereço do aluno: ");
    const matricula = readline.question("Digite o número de matrícula do aluno: ");
    const curso = readline.question("Digite o curso do aluno: ");
    const Serie = readline.question("Digite a série do aluno: ");

    const insert = `
        INSERT INTO alunos
        (nome, email, endereco, matricula, curso, Serie)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        insert,
        [nome, email, endereco, matricula, curso, Serie],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Aluno cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir aluno 
function excluirAluno(){

    const id = readline.questionInt("digite o id do aluno");

    const deletar = "DELETE FROM alunos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o aluno."); 
    } else if (resultado.affectedRows === 0){
           console.log("Aluno não encontrado.");
    } else {
        console.log("Aluno excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar alunos

function listarAlunos(){

    const sql = "SELECT * FROM  alunos";

    conexao.query(sql,function(erro, alunos) {

        if (erro){
            console.log("Erro ao buscar alunos.");
        } else {

            console.log("\n--- Alunos---");
            alunos.forEach(function (aluno){
                console.log(
                    aluno.id + " - " +
                    aluno.nome +" - "+
                    aluno.email+" - "+
                    aluno.endereco+" - "+
                    aluno.matricula+" - "+
                    aluno.curso+" - "+
                    aluno.Serie
                );
            });
        }
        menu();
    });

}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar aluno");
    console.log("2 - Excluir aluno");
    console.log("3 - Listar alunos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarAluno();
    }else if (opcao === 2){

        excluirAluno();
    } else if (opcao === 3){

        listarAlunos();
    }else if (opcao === 0){

        console.log("Programa encerrado.");
        conexao.end();
  } else {
    console.log("Opção invalida.");
    menu();
}
}

// Inicia o programa
menu();