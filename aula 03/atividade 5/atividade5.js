const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "gerenciamento",
    port: 3306
});
// update
function atualizarclientes() {

    const id = readline.questionInt("Digite o ID do Cliente que deseja atualizar: ");
    const nome = readline.question("Digite o nome do Cliente: ");
    const Telefone = readline.question("Digite o numero de Telefone do cliente : ");

  const update = `
    UPDATE clientes
    SET nome = ?,
    telefone = ?
    WHERE id = ?
`;

  conexao.query(
    update,
    [nome, Telefone, id],
    function (erro, resultado) {

        if (erro) {
            console.log("Erro ao atualizar o Cliente.");
            console.log(erro);

        } else if (resultado.affectedRows === 0) {
            console.log("Cliente não encontrado.");

        } else {
            console.log("Cliente atualizado com sucesso!");
        }

        menu();
    }
);
}
// funcao para cadastrar Clientes
function cadastrarClientes() {

    const nome = readline.question("Digite o nome do Cliente: ");
    const Telefone = readline.question("Digite o numero de Telefone: ");
   

    const insert = `
        INSERT INTO clientes
        (nome, Telefone)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [nome, Telefone],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Cliente cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir Cliente
function excluirCliente(){

    const id = readline.questionInt("digite o id do Cliente");

    const deletar = "DELETE FROM clientes WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o Cliente."); 
    } else if (resultado.affectedRows === 0){
           console.log("Cliente não encontrado.");
    } else {
        console.log("Cliente excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar Clientes

function listarClientes(){

    const sql = "SELECT * FROM clientes";

    conexao.query(sql, function(erro, clientes) {

        if (erro) {

            console.log("Erro ao buscar Cliente.");
            console.log(erro);

        } else {

            console.log("\n--- Clientes ---");

            jogos.forEach(function(clientes){

                console.log(
                    clientes.id + " - " +
                    clientes.nome + " - " +
                    clientes.Telefone
                );

            });
        }

        menu();
    });
}

// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Cliente");
    console.log("2 - Excluir  Cliente");
    console.log("3 - Listar  Cliente");
    console.log("4 - atualizar  Cliente");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarClientes();
    }else if (opcao === 2){

        excluirCliente();
    } else if (opcao === 3){

        listarClientes();
    }else if (opcao === 4){
    
        atualizarclientes();
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
