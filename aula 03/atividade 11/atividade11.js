const mysql = require("mysql2");
const readline = require("readline-sync");

// conexão com MySQL
const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "sistemasEventos",
    port: 3306
});
// funcao para cadastrar eventos
function cadastrareventos() {

    const nome = readline.question("Digite o nome do Evento: ");
    const data = readline.question("Digite a data do Evento: ");
   

    const insert = `
        INSERT INTO eventos
        (nome, data)
        VALUES (?, ?)
    `;

    conexao.query(
        insert,
        [nome, data],
        function (erro, resultado) {

            if (erro) {

                console.log("ERRO AO CADASTRAR:");
                console.log(erro);

            } else {

                console.log("Evento cadastrado com sucesso!");
                console.log("ID criado:", resultado.insertId);

            }

            menu();
        }
    );
}
// funcao para excluir Eventos
function excluireventos(){

    const id = readline.questionInt("digite o id do Evento");

    const deletar = "DELETE FROM eventos WHERE id = ?";

    conexao.query(deletar, [id], function (erro, resultado){
    if(erro){
           console.log("Erro ao excluir o Evento."); 
    } else if (resultado.affectedRows === 0){
           console.log("Evento não encontrado.");
    } else {
        console.log("Evento excluido com sucesso!");
    }    
    menu();
});

}
// Função para listar Eventos
function listareventos(){

    const sql = "SELECT * FROM eventos";

    conexao.query(sql, function(erro, eventos) {

        if (erro) {

            console.log("Erro ao buscar o evento solicitado.");
            console.log(erro);

        } else {

            console.log("\n--- Eventos ---");

            jogos.forEach(function(eventos){

                console.log(
                    eventos.id + " - " +
                    eventos.nome + " - " +
                    eventoss.data
                );

            });
        }

        menu();
    });
}
 // update
function atualizareventos() {

    const id = readline.questionInt("Digite o ID do eventos que deseja atualizar: ");
    const nome = readline.question("Digite  nome do evento: ");
    const data = readline.question("Digite a data: ");

  const update = `
    UPDATE eventos
    SET nome = ?,
    data = ?
    WHERE id = ?
`;

  conexao.query(
    update,
    [nome, data, id],
    function (erro, resultado) {

        if (erro) {
            console.log("Erro ao atualizar o evento.");
            console.log(erro);

        } else if (resultado.affectedRows === 0) {
            console.log("evento não encontrado.");

        } else {
            console.log("evento atualizado com sucesso!");
        }

        menu();
    }
);
}
// Menu principal
function menu(){

    console.log("\n===== MENU=====");
    console.log("1 - Cadastrar Eventos");
    console.log("2 - Excluir  Eventos");
    console.log("3 - Listar  Eventos");
    console.log("4 - Atualizar  Eventos");
    console.log("0 - Sair");

    const opcao = readline.questionInt("Escolha uma opcão:");
    
    if (opcao === 1){

        cadastrareventos();
    }else if (opcao === 2){

        excluireventos();
    } else if (opcao === 3){

        listareventos();
    }else if (opcao === 4){

       atualizareventos();
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
