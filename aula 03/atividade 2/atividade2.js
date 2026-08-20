const mysql = require("mysql2");
const readline = require("readline-sync");

// conexao com mysql
const conexao = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"loja1"
});

// funcao para cadastrar aluno
function cadastrarProdutos() {

    const nome = readline.question("Digite o nome do produto: ");
    const preco = readline.question("Digite o preço do produto: ");
    const quantidade = readline.question("Digite a quantidade de produtos: ");
   

    const insert = `
        INSERT INTO produtos
        (nome, preco, quantidade)
        VALUES (?, ?, ?)
    `;

    conexao.query(
        insert,
        [nome, preco, quantidade],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Produto cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir produto
function excluirProdutos(){

    const id = readline.questionInt("digite o id do produto");

    const deletar = "DELETE FROM produtos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o produto."); 
    } else if (resultado.affectedRows === 0){
           console.log("Produto não encontrado.");
    } else {
        console.log("Produto excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar produtos

function listarProdutos(){

    const sql = "SELECT * FROM  produtos";

    conexao.query(sql,function(erro, produtos) {

        if (erro){
            console.log("Erro ao buscar produtos.");
        } else {

            console.log("\n--- Produtos---");
            produtos.forEach(function (Produtos){
                console.log(
                    produtos.id + " - " +
                    produtos.nome +" - "+
                    produtos.preco+" - "+
                    produtos.quantidade
                );
            });
        }
        menu();
    });

}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Produtos");
    console.log("2 - Excluir Produtos");
    console.log("3 - Listar Produtos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarProdutos();
    }else if (opcao === 2){

        excluirProdutos();
    } else if (opcao === 3){

        listarProdutos();
    }else if (opcao === 0){

        console.log("Programa encerrado.");
        conexao.end();
  } else {
    console.log("Opção invalida.");
    menu();
}
}
menu();
