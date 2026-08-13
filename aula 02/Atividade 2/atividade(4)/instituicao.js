const mysql = require("mysql2");

//Conexão com mysql
const Conexão = mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "INSTITUICAO"
})
// dados que seram cadastrados 

const nome_do_curso = "Desenvolvimento de Sistemas";
const carga_horaria = "1200";

// comandos mysql
const insert = "INSERT INTO cursos (nome_do_curso, carga_horaria) values (?,?)";

// dadso que ream envidados 
Conexão.query(insert,[nome_do_curso,carga_horaria],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.lof("erro ao cadastrar.");
        console.log(erro);
    }else{
        console.log("Cursos cadastrados com sucesso!");
    }
});
// id do cursos que seram deletados 
const id = 5;

const deletar = "delete from cursos where id = ?";

Conexão.query(deletar,[id], function (erro, resultado){
    if(erro){
        console.log("Erro ao excluir o curso.");
        console.log(erro);
    }else if (resultado.affectedRows === 0){
        console.log("Curso não encontrado.");
    }else{
        console.log("Curso excluido com sucesso!");
    }
    Conexão.end();
});