const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "3306"
});
// CONECTAR AO MYSQL
conexao.connect(function (erro) {

    if (erro) {
        console.log("Erro ao conectar ao MySQL:");
        console.log(erro);
        return;
    }

    console.log("Conectado ao MySQL!");

    menu();
});
// CADASTRAR VEÍCULOS
function cadastrarveiculos() {

    const modelo = readline.question("Digite o modelo do veiculo: ");
    const placa = readline.question("Digite a numeracao da placa: ");

    const insert = `
        INSERT INTO veiculos
        (modelo, placa)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [modelo, placa],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Veiculo cadastrado com sucesso!");
                console.log("Id criado:", resultado.insertId);
            }

            menu();
        }
    );
}
// EXCLUIR VEÍCULos
function excluirveiculos() {
    const id = readline.questionInt("Digite o id do veiculo: ");
    const deletar = "DELETE FROM veiculos WHERE id = ?";
    conexao.query(
        deletar,
        [id],
        function (erro, resultado) {

            if (erro) {

                console.log("Erro ao excluir o veiculo.");
                console.log(erro);

            } else if (resultado.affectedRows === 0) {

                console.log("Veiculo nao encontrado.");

            } else {

                console.log("Veiculo excluido com sucesso!");
            }

            menu();
        }
    );
}
// LISTAR VEÍCULOS
function listarveiculos() {

    const sql = "SELECT * FROM veiculos";

    conexao.query(
        sql,
        function (erro, veiculos) {

            if (erro) {

                console.log("Erro ao buscar os veiculos.");
                console.log(erro);

            } else {

                console.log("\n--- VEICULOS ---");

                if (veiculos.length === 0) {

                    console.log("Nenhum veiculo cadastrado.");

                } else {

                    veiculos.forEach(function (veiculo) {

                        console.log(
                            veiculo.id +
                            " - " +
                            veiculo.modelo +
                            " - " +
                            veiculo.placa
                        );

                    });
                }
            }

            menu();
        }
    );
}
// MENU PRINCIPAL
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar Veiculos");
    console.log("2 - Excluir Veiculos");
    console.log("3 - Listar Veiculos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarveiculos();

    } else if (opcao === 2) {

        excluirveiculos();

    } else if (opcao === 3) {

        listarveiculos();

    } else if (opcao === 0) {

        console.log("Programa encerrado.");
        conexao.end();

    } else {

        console.log("Opcao invalida.");
        menu();
    }
}