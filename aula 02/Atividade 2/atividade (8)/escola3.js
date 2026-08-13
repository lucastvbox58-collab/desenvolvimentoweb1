const mysql = require("mysql2")
 
// Conexão com o Mysql
const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola3"
});
 
// Dados que serão cadastrados
const nome_diciplina = "Análise de sistemas"
const nome_professor = "marlon"
const aulas_semanais = "5 aulas semanais"
 
// Comando SQL
const insert = "INSERT INTO diciplinas (nome_diciplina, nome_professor, aulas_semanais) VALUES (?, ?, ?)";
 
//Envia os dados para o MySQL
conexao.query(insert,[nome_diciplina, nome_professor, aulas_semanais], function(erro){
 
    if (erro) {
        console.log("Erro ao cadastrar.");
        console.log(erro);
    } else {
        console.log("diciplina cadastrado com sucesso");
    }
});
//ID do Filme que será excluido
const id = 2;
 
const deletar = "DELETE FROM diciplinas WHERE id = ?";
 
conexao.query(deletar, [id], function (erro, resultado){
 
    if (erro) {
        console.log("Erro ao excluir diciplina.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("diciplina não encontrado");
        } else {
            console.log("diciplina excluido com sucesso!")
        }
    conexao.end();
});