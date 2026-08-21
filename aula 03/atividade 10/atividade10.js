const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "laboratorio",
    port: 3306
});
// funcao para cadastrar computadores
function cadastrarcomputadores() {

    const patrimonio = readline.question("Digite o numero do patrimonio: ");
    const localizacao = readline.question("Digite onde esta a localização do patrimonio: ");
   

    const insert = `
        INSERT INTO computadores
        (patrimonio, localizacao)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [patrimonio, localizacao],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Patrimonio cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir computadores
function excluircomputadores(){

    const id = readline.questionInt("digite o id do Patrimonio");

    const deletar = "DELETE FROM computadores WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o patrimonio."); 
    } else if (resultado.affectedRows === 0){
           console.log("Patrimonio não encontrado.");
    } else {
        console.log("Patrimonio excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar computadores
function listarcomputadores(){

    const sql = "SELECT * FROM computadores";

    conexao.query(sql, function(erro, computadores) {

        if (erro) {

            console.log("Erro ao buscar o patrimonio solicitado.");
            console.log(erro);

        } else {

            console.log("\n--- Computadores ---");

            jogos.forEach(function(Tarefas){

                console.log(
                    computadores.id + " - " +
                    computadores.patrimonio + " - " +
                    computadores.localizacao
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Computadores");
    console.log("2 - Excluir  Computadores");
    console.log("3 - Listar  Computadores");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarcomputadores();
    }else if (opcao === 2){

        excluircomputadores();
    } else if (opcao === 3){

        listarcomputadores();
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
