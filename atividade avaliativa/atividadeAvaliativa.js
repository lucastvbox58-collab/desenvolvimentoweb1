const mysql = require("mysql2");
const readline = require("readline-sync");

const conexao = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"laboratorio_avaliacao",
    port: 3306
});
function cadastrar_computadores() {

    console.log("------------ Painel de Cadastro ------------\n");

    const patrimonio = readline.question(
        "Insira o numero do patrimonio: ");
    const localizacao = readline.question(
        "Digite a localizacao do patrimonio: ");
    const responsavel = readline.question(
        "Digite o nome do responsavel pelo patrimonio: ");
    const situacao = readline.question(
        "Insira qual e a situacao do patrimonio: ");
    const insert = `
        INSERT INTO computadores
        (patrimonio, localizacao, responsavel, situacao)
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(
        insert,
        [patrimonio, localizacao, responsavel, situacao],
        function (erro, resultado) {

            if (erro) {
                console.log("Erro ao cadastrar:");
                console.log(erro);
            } else {
                console.log("Computador cadastrado com sucesso!");
                console.log("ID criado: " + resultado.insertId);
            }

            menu();
        }
    );
}
function excluir_computadores() {

    const id = readline.questionInt("Digite o ID do Computador: ");

    const buscar = "SELECT * FROM computadores WHERE id = ?";

    conexao.query(buscar, [id], function (erro, resultado) {

        if (erro) {
            console.log("Erro ao buscar o computador.");
            console.log(erro);
            menu();
            return;
        }
        if (resultado.length === 0) {
            console.log("Computador não encontrado.");
            menu();
            return;
        }
    const computadores = resultado[0];

        console.log("\n------------Computador ENCONTRADO------------");
        console.log("ID: " + computadores.id);
        console.log("Patrimonio: " + computadores.patrimonio);
        console.log("Localização: " + computadores.localizacao);
        console.log("Responsavel"+computadores.responsavel);
        console.log("Situação"+computadores.situacao);

        const confirmar = readline.question(
            "\nDeseja realmente excluir este patrimonio? (S/N): "
        );
        if (confirmar.toUpperCase() !== "S") {
            console.log("Exclusao cancelada.");
            menu();
            return;
        }
        const deletar = "DELETE FROM computadores WHERE id = ?";
        conexao.query(deletar, [id], function (erro, resultado) {

            if (erro) {
                console.log("Erro ao excluir o Computador.");
                console.log(erro);
            } else {
                console.log("Computador excluido com sucesso!");
            }

            menu();
        });
    });
}
function listar_computadores(){

    const slq = "SELECT * FROM  computadores";
    conexao.query(slq, function(erro, computadores){
        
        if (erro){
            console.log("Erro ao buscar o pcomputador solicitado!!");
            console.log(erro);
        } else{
            console.log("\n-------------Computadres------------\n");
            computadores.forEach(function(computadores){
            
                console.log(
                    computadores.id+" - "+
                    computadores.patrimonio+" - "+
                    computadores.localizacao+" - "+
                    computadores.responsavel+" - "+
                    computadores.situacao
                );
            });
        }
        menu();
    });
}
function atualizar_computadores() {

    const id = readline.questionInt("Digite o ID do patrimonio que deseja atualizar: ");
    const patrimonio = readline.question("Digite  numero do patrimonio: ");
    const localizacao = readline.question("Digite a localização: ");
    const responsavel = readline.question("Insira o nome do responsavel pelo patrimonio:");
    const situacao = readline.question("Insira a Situação atual do computador:");

  const update = `
    UPDATE computadores
    SET patrimonio = ?,
    localizacao = ?,
    responsavel = ?,
    situacao = ?
    WHERE id = ?
`;

  conexao.query(
    update,
    [patrimonio, localizacao, responsavel, situacao, id],
    function (erro, resultado) {

        if (erro) {
            console.log("Erro ao atualizar o Computador desejado!");
            console.log(erro);

        } else if (resultado.affectedRows === 0) {
            console.log("Computador não encontrado.");

        } else {
            console.log("Computador atualizado com sucesso!");
        }

        menu();
    }
);
}
function menu(){

    console.log("\n------------MENU------------\n");
    console.log("1 - Cadastrar Computadores");
    console.log("2 - Listar Computadores");
    console.log("3 - Atualizar computadores");
    console.log("4 - Excluir Computadores");
    console.log("0 - Sair do programa!");

    const opcao = readline.questionInt("Escolha uma opção:");
      
    if (opcao === 1){

        cadastrar_computadores();
    }else if (opcao === 2){

        listar_computadores();
    } else if (opcao === 3){

        atualizar_computadores();
    }else if (opcao === 4){

         excluir_computadores();
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










