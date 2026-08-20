const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "gamer",
    port: 3306
});
// funcao para cadastrar livros
function cadastrarLivros() {

    const nome = readline.question("Digite o nome do jogo: ");
    const genero = readline.question("Digite o genero: ");
   

    const insert = `
        INSERT INTO gamer
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
                    livro.titulo + " - " +
                    livro.autor
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Livros");
    console.log("2 - Excluir Livros");
    console.log("3 - Listar Livros");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarLivros();
    }else if (opcao === 2){

        excluirLivros();
    } else if (opcao === 3){

        listarLivros();
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
