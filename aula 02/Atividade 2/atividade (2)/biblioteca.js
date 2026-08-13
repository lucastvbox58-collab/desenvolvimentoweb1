const mysql = require("mysql2");

// Conexão com  MySQL
const conexao =  mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "Biblioteca"
});
// dados que seram cadastrados 

const nome_do_livro = "O Pequeno Príncipe";
const nome_do_autor= "Antoine de Saint-Exupéry";


// comando mysql
const insert = "INSERT INTO livros (nome_do_livro, nome_do_autor)values (?,?)";

// dados que seram enviados 
conexao.query(insert,[nome_do_livro,nome_do_autor],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.log("erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Livros cadastrados com sucesso!");
    }
});

//id do produto que sera deletado
const id = 3;


const deletar = "delete from produto where id = ?";

conexao.query(deletar, [id], function (erro, resultado){
    if (erro){
        console.log("Erro ao excluir o livro.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("Livro não encontrado.");
    } else {
        console.log("Livro excluído com sucesso!");
    }
    conexao.end();
});

    
