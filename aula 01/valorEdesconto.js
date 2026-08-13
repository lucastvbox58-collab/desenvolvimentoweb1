function calcularDesconto(produtoValor,desconto){
    var valorDesconto = produtoValor*(desconto/100);
       var valorFinal = produtoValor - valorDesconto
    console.log ("valor Final com desconto é ",valorFinal);
}
calcularDesconto(150,10)

