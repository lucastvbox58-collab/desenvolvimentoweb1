const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "sistemaSimples",
    port: 3306
});
// funcao para cadastrar Cursos
function cadastrarTarefas() {

    const descricao = readline.question("Digite a descrição da tarefa: ");
    const responsavel = readline.question("Digite o nome do Responsavel : ");
   

    const insert = `
        INSERT INTO Tarefas
        (descricao, responsavel)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [descricao, responsavel],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Tarefa cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir Tarefa
function excluirTarefas(){

    const id = readline.questionInt("digite o id da Tarefa");

    const deletar = "DELETE FROM Tarefas WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o Tarefa."); 
    } else if (resultado.affectedRows === 0){
           console.log("Tarefas não encontrado.");
    } else {
        console.log("Tarefas excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar Cursos
function listarTarefas(){

    const sql = "SELECT * FROM Tarefas";

    conexao.query(sql, function(erro, Tarefas) {

        if (erro) {

            console.log("Erro ao buscar a Tarefa solicitado.");
            console.log(erro);

        } else {

            console.log("\n--- Tarefas ---");

            jogos.forEach(function(Tarefas){

                console.log(
                    Tarefas.id + " - " +
                    Tarefas.descricao + " - " +
                    Tarefas.responsavel
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Tarefas");
    console.log("2 - Excluir  Tarefas");
    console.log("3 - Listar  Tarefas");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarTarefas();
    }else if (opcao === 2){

        excluirTarefas();
    } else if (opcao === 3){

        listarTarefas();
    }else if (opcao === 0){

        console.log("Programa encerrado.");
        conexao.end();
  } else {
    console.log("Opção invalida.");
    menu();
}
}
conexao.connect(function(erro) {

    if (erro) {

        console.log("Erro ao conectar ao MySQL:");
        console.log(erro);

    } else {

        console.log("MySQL conectado com sucesso!");
        menu();

    }
});
