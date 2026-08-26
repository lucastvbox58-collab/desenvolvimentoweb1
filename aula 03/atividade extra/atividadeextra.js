const mysql = require("mysql2");
const readline = require("readline-sync");

// ===============================
// CONEXÃO COM O MYSQL
// ===============================
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "cadastro"
});

// Conecta ao banco
conexao.connect(function (erro) {
    if (erro) {
        console.log("Erro ao conectar com o MySQL:");
        console.log(erro);
        return;
    }

    console.log("Conectado ao MySQL com sucesso!");

    menu();
});


// ===============================
// CADASTRAR ALUNO
// ===============================
function cadastrarAluno() {

    const nome = readline.question("Insira o nome do aluno: ");
    const email = readline.question("Insira o email do aluno: ");
    const endereco = readline.question("Insira o endereco: ");
    const matricula = readline.question("Insira a matricula: ");
    const curso = readline.question("Insira o nome do curso: ");
    const serie = readline.question("Insira a serie: ");

    const insert = `
        INSERT INTO alunos 
        (nome, email, endereco, matricula, curso, serie) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        insert,
        [nome, email, endereco, matricula, curso, serie],
        function (erro) {

            if (erro) {
                console.log("Erro ao cadastrar.");
                console.log(erro);
            } else {
                console.log("Aluno cadastrado com sucesso!");
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

    const sql = "SELECT * FROM alunos WHERE id = ?";

    conexao.query(sql, [id], function (erro, alunos) {

        if (erro) {
            console.log("Erro ao buscar aluno.");
            console.log(erro);
            menu();
        }

        else if (alunos.length === 0) {
            console.log("Aluno nao encontrado.");
            menu();
        }

        else {

            console.log("\n===== REGISTRO ENCONTRADO =====");

            console.log("Nome:", alunos[0].nome);
            console.log("Email:", alunos[0].email);
            console.log("Endereco:", alunos[0].endereco);
            console.log("Matricula:", alunos[0].matricula);
            console.log("Curso:", alunos[0].curso);
            console.log("Serie:", alunos[0].serie);

            const confirmar = readline.question(
                "Deseja excluir? (S/N): "
            );

            if (confirmar === "S" || confirmar === "s") {

                const deletar = "DELETE FROM alunos WHERE id = ?";

                conexao.query(
                    deletar,
                    [id],
                    function (erro, resultado) {

                        if (erro) {
                            console.log("Erro ao excluir o aluno.");
                            console.log(erro);
                        }

                        else if (resultado.affectedRows === 0) {
                            console.log("Aluno nao encontrado.");
                        }

                        else {
                            console.log("Aluno excluido com sucesso!");
                        }

                        menu();
                    }
                );

            } else {

                console.log("Exclusao cancelada.");
                menu();

            }
        }
    });
}


// ===============================
// LISTAR ALUNOS
// ===============================
function listarAlunos() {

    const sql = "SELECT * FROM alunos";

    conexao.query(sql, function (erro, alunos) {

        if (erro) {

            console.log("Erro ao buscar alunos.");
            console.log(erro);

        } else {

            console.log("\n===== ALUNOS CADASTRADOS =====");

            if (alunos.length === 0) {

                console.log("Nenhum aluno cadastrado.");

            } else {

                alunos.forEach(function (aluno) {

                    console.log("-----------------------------");

                    console.log("ID:", aluno.id);
                    console.log("Nome:", aluno.nome);
                    console.log("Email:", aluno.email);
                    console.log("Endereco:", aluno.endereco);
                    console.log("Matricula:", aluno.matricula);
                    console.log("Curso:", aluno.curso);
                    console.log("Serie:", aluno.serie);

                });

                console.log("-----------------------------");
            }
        }

        menu();
    });
}


// ===============================
// MENU PRINCIPAL
// ===============================
function menu() {

    console.log("\n==============================");
    console.log("       SISTEMA DE ALUNOS");
    console.log("==============================");

    console.log("1 - Cadastrar aluno");
    console.log("2 - Excluir aluno");
    console.log("3 - Listar alunos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcao: ");

    if (opcao === 1) {

        cadastrarAluno();

    } else if (opcao === 2) {

        excluirAluno();

    } else if (opcao === 3) {

        listarAlunos();

    } else if (opcao === 0) {

        console.log("Programa encerrado.");

        conexao.end(function (erro) {

            if (erro) {
                console.log("Erro ao fechar conexao:", erro);
            } else {
                console.log("Conexao com MySQL encerrada.");
            }

        });

    } else {

        console.log("Opcao invalida.");

        menu();
    }
}