const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola",
    port: 3306
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao MySQL:");
        console.log(erro);
        return;
    }

    console.log("Conectado ao MySQL!");
    menu();
});


// ===============================
// CADASTRAR ALUNO
// ===============================
function cadastrarAluno() {

    const nome = readline.question("Digite o nome do aluno: ");
    const email = readline.question("Digite o email do aluno: ");
    const endereco = readline.question("Digite o endereço do aluno: ");
    const matricula = readline.question("Digite o número de matrícula do aluno: ");
    const curso = readline.question("Digite o curso do aluno: ");
    const Serie = readline.question("Digite a série do aluno: ");

    const insert = `
        INSERT INTO alunos
        (nome, email, endereco, matricula, curso, Serie)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        insert,
        [nome, email, endereco, matricula, curso, Serie],
        function (erro, resultado) {

            if (erro) {
                console.log("ERRO AO CADASTRAR:");
                console.log(erro);
            } else {
                console.log("Aluno cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);
            }

            menu();
        }
    );
}


// ===============================
// ATUALIZAR ALUNO
// ===============================
function atualizarAlunos() {

    const id = readline.questionInt("Digite o ID do aluno que deseja atualizar: ");

    const nome = readline.question("Digite o nome do aluno: ");
    const email = readline.question("Digite o email do aluno: ");
    const endereco = readline.question("Digite o endereço do aluno: ");
    const matricula = readline.question("Digite o número de matrícula do aluno: ");
    const curso = readline.question("Digite o curso do aluno: ");
    const Serie = readline.question("Digite a série do aluno: ");

    const update = `
        UPDATE alunos
        SET nome = ?,
            email = ?,
            endereco = ?,
            matricula = ?,
            curso = ?,
            Serie = ?
        WHERE id = ?
    `;

    conexao.query(
        update,
        [nome, email, endereco, matricula, curso, Serie, id],
        function (erro, resultado) {

            if (erro) {
                console.log("Erro ao atualizar o aluno.");
                console.log(erro);

            } else if (resultado.affectedRows === 0) {
                console.log("Aluno não encontrado.");

            } else {
                console.log("Aluno atualizado com sucesso!");
            }

            menu();
        }
    );
}


// ===============================
// EXCLUIR ALUNO
// ===============================
function excluirAluno() {

    const id = readline.questionInt("Digite o ID do aluno: ");

    const deletar = "DELETE FROM alunos WHERE id = ?";

    conexao.query(
        deletar,
        [id],
        function (erro, resultado) {

            if (erro) {
                console.log("Erro ao excluir o aluno.");
                console.log(erro);

            } else if (resultado.affectedRows === 0) {
                console.log("Aluno não encontrado.");

            } else {
                console.log("Aluno excluído com sucesso!");
            }

            menu();
        }
    );
}


// ===============================
// LISTAR ALUNOS
// ===============================
function listarAlunos() {

    const sql = "SELECT * FROM alunos";

    conexao.query(
        sql,
        function (erro, alunos) {

            if (erro) {
                console.log("Erro ao buscar alunos.");
                console.log(erro);

            } else {

                console.log("\n--- ALUNOS ---");

                alunos.forEach(function (aluno) {

                    console.log(
                        aluno.id + " - " +
                        aluno.nome + " - " +
                        aluno.email + " - " +
                        aluno.endereco + " - " +
                        aluno.matricula + " - " +
                        aluno.curso + " - " +
                        aluno.Serie
                    );

                });
            }

            menu();
        }
    );
}


// ===============================
// MENU PRINCIPAL
// ===============================
function menu() {

    console.log("\n===== MENU =====");
    console.log("1 - Cadastrar aluno");
    console.log("2 - Excluir aluno");
    console.log("3 - Atualizar aluno");
    console.log("4 - Listar alunos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1) {

        cadastrarAluno();

    } else if (opcao === 2) {

        excluirAluno();

    } else if (opcao === 3) {

        atualizarAlunos();

    } else if (opcao === 4) {

        listarAlunos();

    } else if (opcao === 0) {

        console.log("Programa encerrado.");
        conexao.end();

    } else {

        console.log("Opção inválida.");
        menu();
    }
}