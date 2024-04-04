const numeroPrimo = require('../modulos/util/numeroPrimo');
const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Home');
});

app.get('/usuario/:nome', function(req, res) {
    let nome = req.params.nome;
    
    res.send(`Ola ${nome}`);
});

app.get('/numeroPrimo/:num', function(req, res) {
    let num = req.params.num;
    let ehPrimo = numeroPrimo.verificarNumeroPrimo(num);
    
    try {
        if(ehPrimo) {
            res.status(200).send(`Número ${num} é primo`);
        } else {
            res.status(200).send(`Número ${num} não é primo`);
        }
    } catch {
        res.status(400).send('Falha na requisição');
    }
});

const PORT = 8080;
const server = app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${server.address().port}`)
});