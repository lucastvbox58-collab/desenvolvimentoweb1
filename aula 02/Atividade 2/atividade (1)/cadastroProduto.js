const mysql = require("mysql2");

// Conexão com  MySQL
const conexao =  mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "root",
    database: "e_comerce"
});
// dados que seram cadastrados 

const nome_do_produto = "Mause";
const valor_do_produto = "75,5";


// comando mysql
const insert = "INSERT INTO produtos (nome_do_produto, valor_do_produto)values (?,?)";

// dados que seram enviados 
conexao.query(insert,[nome_do_produto,valor_do_produto],function (erro){
    // este e o nosso se e senao 
    if (erro){
        console.log("erro ao cadastrar.");
        console.log(erro);
    }else {
        console.log("Produtos cadastrados com sucesso!");
    }
});

//id do produto que sera deletado
const id = 1;


const deletar = "delete from produto where id = ?";

conexao.query(deletar, [id], function (erro, resultado){
    if (erro){
        console.log("Erro ao excluir o produto.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("Produto não encontrado.");
    } else {
        console.log("Produto excluído com sucesso!");
    }
    conexao.end();
});

    


