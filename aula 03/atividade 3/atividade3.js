const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "biblioteca1",
    port: 3306
});
// funcao para cadastrar livros
function cadastrarLivros() {

    const titulo = readline.question("Digite o Titulo do livro: ");
    const autor = readline.question("Digite o autor do Livro: ");
   

    const insert = `
        INSERT INTO livros
        (titulo, autor)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [titulo, autor],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Livro cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// update
function atualizarLivros() {

    const id = readline.questionInt("Digite o ID do Livro que deseja atualizar: ");
    const titulo = readline.question("Digite o Titulo do Livro: ");
    const autor = readline.question("Digite o Nome do Autor : ");

  const update = `
    UPDATE Livros
    SET titulo = ?,
        autor = ?
    WHERE id = ?
`;

  conexao.query(
    update,
    [titulo, autor, id],
    function (erro, resultado) {

        if (erro) {
            console.log("Erro ao atualizar o Livro.");
            console.log(erro);

        } else if (resultado.affectedRows === 0) {
            console.log("Livro não encontrado.");

        } else {
            console.log("Livro atualizado com sucesso!");
        }

        menu();
    }
);
}
// funcao para excluir livros
function excluirLivros(){

    const id = readline.questionInt("digite o id do Livro");

    const deletar = "DELETE FROM Livros WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o Livros."); 
    } else if (resultado.affectedRows === 0){
           console.log("Livro não encontrado.");
    } else {
        console.log("Livro excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar Livros

function listarLivros(){

    const sql = "SELECT * FROM livros";

    conexao.query(sql, function(erro, livros) {

        if (erro) {

            console.log("Erro ao buscar livros.");
            console.log(erro);

        } else {

            console.log("\n--- Livros ---");

            livros.forEach(function(livro){

                console.log(
                    livro.id + " - " +
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
    console.log("3 - Atualizar Livros");
    console.log("4 - Listar Livros");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarLivros();
    }else if (opcao === 2){

        excluirLivros();
    } else if (opcao === 3){
    
        atualizarLivros();
    }else if (opcao === 4){

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
