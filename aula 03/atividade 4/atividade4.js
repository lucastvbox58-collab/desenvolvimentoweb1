const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "games",
    port: 3306
});
// update
function atualizarJogos() {

    const id = readline.questionInt("Digite o ID do Jogo que deseja atualizar: ");
    const nome = readline.question("Digite o Nome do Jogo: ");
    const genero = readline.question("Digite o genero do jogo : ");

  const update = `
    UPDATE jogos
    SET nome = ?,
        genero = ?
    WHERE id = ?
`;

  conexao.query(
    update,
    [nome, genero, id],
    function (erro, resultado) {

        if (erro) {
            console.log("Erro ao atualizar o Jogo.");
            console.log(erro);

        } else if (resultado.affectedRows === 0) {
            console.log("Jogo não encontrado.");

        } else {
            console.log("Jogo atualizado com sucesso!");
        }

        menu();
    }
);
}
// funcao para cadastrar Jogos
function cadastrarJogos() {

    const nome = readline.question("Digite o nome do jogo: ");
    const genero = readline.question("Digite o genero: ");
   

    const insert = `
        INSERT INTO jogos
        (nome, genero)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [nome, genero],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("jogo cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir jogos
function excluirJogos(){

    const id = readline.questionInt("digite o id do jogo");

    const deletar = "DELETE FROM jogos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o jogo."); 
    } else if (resultado.affectedRows === 0){
           console.log("jogo não encontrado.");
    } else {
        console.log("Jogo excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar jogos

function listarJogos(){

    const sql = "SELECT * FROM jogos";

    conexao.query(sql, function(erro, jogos) {

        if (erro) {

            console.log("Erro ao buscar jogo.");
            console.log(erro);

        } else {

            console.log("\n--- Jogos ---");

            jogos.forEach(function(jogos){

                console.log(
                    jogos.id + " - " +
                    jogos.nome+ " - " +
                    jogos.genero
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Jogos");
    console.log("2 - Excluir Jogos");
    console.log("3 - Listar Jogos");
    console.log("4 - Atualizar Jogos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarJogos();
    }else if (opcao === 2){

        excluirJogos();
    } else if (opcao === 3){

        listarJogos();
    }else if (opcao === 4){
    
       atualizarJogos();
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
