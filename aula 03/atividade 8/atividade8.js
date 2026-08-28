const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "escola2",
    port: 3306
});
// funcao para cadastrar Cursos
function cadastrarCursos() {

    const nome = readline.question("Digite o nome do Curso: ");
    const carga_Horaria = readline.question("Digite o Carga_Horaria : ");
   

    const insert = `
        INSERT INTO Cursos
        (nome, carga_Horaria)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [nome, carga_Horaria],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Curso cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir Cursos
function excluirCursos(){

    const id = readline.questionInt("digite o id do Cursos");

    const deletar = "DELETE FROM Cursos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o Curso."); 
    } else if (resultado.affectedRows === 0){
           console.log("Curso não encontrado.");
    } else {
        console.log("Curso excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar Cursos
function listarCursos(){

    const sql = "SELECT * FROM Cursos";

    conexao.query(sql, function(erro, Cursos) {

        if (erro) {

            console.log("Erro ao buscar o Curso solicitado.");
            console.log(erro);

        } else {

            console.log("\n--- Cursos ---");

            jogos.forEach(function(Funcionarios){

                console.log(
                    Cursos.id + " - " +
                    Cursos.nome + " - " +
                    Cursos.carga_Horaria
                );

            });
        }

        menu();
    });
}
// update
function atualizarCursos() {

    const id = readline.questionInt("Digite o ID do Curso que deseja atualizar: ");
    const nome = readline.question("Digite o nome do Curso: ");
    const carga_horaria = readline.question("Digite a carga_Horaria do curso : ");

  const update = `
    UPDATE Cursos
    SET nome = ?,
    carga_horaria = ?
    WHERE id = ?
`;

  conexao.query(
    update,
    [nome, carga_horaria, id],
    function (erro, resultado) {

        if (erro) {
            console.log("Erro ao atualizar o Curso.");
            console.log(erro);

        } else if (resultado.affectedRows === 0) {
            console.log("Curso não encontrado.");

        } else {
            console.log("Curso atualizado com sucesso!");
        }

        menu();
    }
);
}
// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Cursos");
    console.log("2 - Excluir  Cursos");
    console.log("3 - Listar  Cursos");
    console.log("4 - Atualizar  Cursos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrarCursos();
    }else if (opcao === 2){

        excluirCursos();
    } else if (opcao === 3){

        listarCursos();
    }else if (opcao === 4){
    
       atualizarCursos();
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
