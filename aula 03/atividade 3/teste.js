const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "biblioteca1",
    port: 3306
});

conexao.connect(function(erro) {

    if (erro) {

        console.log("ERRO NA CONEXÃO:");
        console.log(erro);

    } else {

        console.log("CONEXÃO COM MYSQL FUNCIONOU!");

    }

});