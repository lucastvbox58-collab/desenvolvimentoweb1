const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "empresa1",
    port: 3306
});
// funcao para cadastrar Funcionarios
function cadastrarFuncionarios() {

    const nome = readline.question("Digite o nome do Funcionario: ");
    const cargo = readline.question("Digite o cargo que o funcionario exerce : ");
   

    const insert = `
        INSERT INTO Funcionarios
        (nome, cargo)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [nome, cargo],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Funcionario cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
function excluirfuncionarios() {

    const id = readline.questionInt("Digite o ID do Funcionario: ");

    // Primeiro busca o patrimônio
    const buscar = "SELECT * FROM funcionarios WHERE id = ?";

    conexao.query(buscar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao buscar o funcionario.");
            console.log(erro);
            menu();
            return;
        }

        // Verifica se o funcionario existe
        if (resultado.length === 0) {
            console.log("funcionario não encontrado.");
            menu();
            return;
        }

      // Pega os dados encontrados
    const funcionario = resultado[0];

        console.log("\n===== Funcionario ENCONTRADO =====");
        console.log("ID: " + funcionario.id);
        console.log("nome: " + funcionario.nome);
        console.log("cargo: " + funcionario.cargo);
        console.log("================================");

        // Pergunta se deseja excluir
        const confirmar = readline.question(
            "\nDeseja realmente excluir este Funcionario? (S/N): "
        );

        if (confirmar.toUpperCase() !== "S") {
            console.log("Exclusao cancelada.");
            menu();
            return;
        }

        // Exclui o patrimônio
        const deletar = "DELETE FROM funcionarios WHERE id = ?";

        conexao.query(deletar, [id], function (erro, resultado) {

            if (erro) {
                console.log("Erro ao excluir o funcionario.");
                console.log(erro);
            } else {
                console.log("Funcionario excluido com sucesso!");
            }

            menu();
        });
    });
}

// Função para listar Funcionarios
function listarFuncionarios(){

    const sql = "SELECT * FROM Funcionarios";

    conexao.query(sql, function(erro, Funcionarios) {

        if (erro) {

            console.log("Erro ao buscar o Funcionario solicitado.");
            console.log(erro);

        } else {

            console.log("\n--- Funcionarios ---");

            jogos.forEach(function(Funcionarios){

                console.log(
                    Funcionarios.id + " - " +
                    Funcionarios.nome + " - " +
                    Funcionarios.cargo
                );

            });
        }

        menu();
    });
}
// update
function atualizarFuncionarios() {

    const id = readline.questionInt("Digite o ID do Funcionario que deseja atualizar: ");
    const nome = readline.question("Digite o nome do Funcionario: ");
    const cargo = readline.question("Digite o cargo do Funcionario : ");

  const update = `
    UPDATE Funcionarios
    SET nome = ?,
    cargo = ?
    WHERE id = ?
`;

  conexao.query(
    update,
    [nome, cargo, id],
    function (erro, resultado) {

        if (erro) {
            console.log("Erro ao atualizar o Funcionario.");
            console.log(erro);

        } else if (resultado.affectedRows === 0) {
            console.log("Funcionario não encontrado.");

        } else {
            console.log("Funcionario atualizado com sucesso!");
        }

        menu();
    }
);
}
// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Funcionarios");
    console.log("2 - Excluir  Funcionarios");
    console.log("3 - Listar  Funcionarios");
    console.log("4 - Atualizar  Funcionarios");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarFuncionarios();
    }else if (opcao === 2){

        excluirfuncionarios();
    } else if (opcao === 3){

        listarFuncionarios();
    }else if (opcao === 4){
    
        atualizarFuncionarios();
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
