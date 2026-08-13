const mysql = require("mysql2");

// Conexão com  MySQL
const conexao =  mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "ESCOLA"
});
// dados que seram cadastrados 

const nome_do_professor = "";
const nome_da_materia= "";


// comando mysql
const insert = "INSERT INTO professores (nome_do_professor, nome_da_materia)values (?,?)";

// dados que seram enviados 
conexao.query(insert,[nome_do_professor,nome_da_materia],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.log("erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Professores cadastrados com sucesso!");
    }
});

//id do professores que seram deletado
const id = 2;


const deletar = "delete from Professores where id = ?";

conexao.query(deletar, [id], function (erro, resultado){
    if (erro){
        console.log("Erro ao excluir o professor.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("Profeesor não encontrado.");
    } else {
        console.log("Professor excluído com sucesso!");
    }
    conexao.end();
});
