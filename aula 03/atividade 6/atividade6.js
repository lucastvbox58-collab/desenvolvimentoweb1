const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "colecao",
    port: 3306
});
// funcao para cadastrar Filmes
function cadastrarFilmes() {

    const Titulo = readline.question("Digite o Titulo do filme: ");
    const Ano = readline.question("Digite o Ano de lançamento do filme : ");
   

    const insert = `
        INSERT INTO filmes
        (Titulo, Ano)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [Titulo, Ano],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Filme cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir Filmes
function excluirFilmes(){

    const id = readline.questionInt("digite o id do Filmes");

    const deletar = "DELETE FROM filmes WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o Filme."); 
    } else if (resultado.affectedRows === 0){
           console.log("Filme não encontrado.");
    } else {
        console.log("Filme excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar Filmes
function listarFilmes(){

    const sql = "SELECT * FROM filmes";

    conexao.query(sql, function(erro, filmes) {

        if (erro) {

            console.log("Erro ao buscar filmes.");
            console.log(erro);

        } else {

            console.log("\n--- Filmes ---");

            jogos.forEach(function(filmes){

                console.log(
                    filmes.id + " - " +
                    filmes.Titulo + " - " +
                    filmes.Ano
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Filmes");
    console.log("2 - Excluir  Filmes");
    console.log("3 - Listar  Filmes");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarFilmes();
    }else if (opcao === 2){

        excluirFilmes();
    } else if (opcao === 3){

        listarFilmes();
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
