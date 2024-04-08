const { somar, subtrair, multiplicar, dividir } = require('../modulos/util/calculadora');
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Atividade 4');
})

app.get('/somar/:a/:b', function(req, res) {
    const { a, b } = req.params;
    const num1 = parseInt(a);
    const num2 = parseInt(b);

    if (!isNaN(num1) && !isNaN(num2)) {
        const resultado = somar(num1, num2);

        res.send(`A soma de ${num1} e ${num2} é ${resultado}.`);
    } else {
        res.status(400).send('Os parâmetros devem ser números válidos.');
    }
});

app.get('/subtrair/:a/:b', function(req, res) {
    const { a, b } = req.params;
    const num1 = parseInt(a);
    const num2 = parseInt(b);

    if (!isNaN(num1) && !isNaN(num2)) {
        const resultado = subtrair(num1, num2);

        res.send(`A subtração de ${num1} e ${num2} é ${resultado}.`);
    } else {
        res.status(400).send('Os parâmetros devem ser números válidos.');
    }
});

app.get('/multiplicar/:a/:b', function(req, res) {
    const { a, b } = req.params;
    const num1 = parseInt(a);
    const num2 = parseInt(b);

    if (!isNaN(num1) && !isNaN(num2)) {
        const resultado = multiplicar(num1, num2);

        res.send(`A multiplicação de ${num1} e ${num2} é ${resultado}.`);
    } else {
        res.status(400).send('Os parâmetros devem ser números válidos.');
    }
});

app.get('/dividir/:a/:b', function(req, res) {
    const { a, b } = req.params;
    const num1 = parseInt(a);
    const num2 = parseInt(b);

    if (!isNaN(num1) && !isNaN(num2)) {
        const resultado = dividir(num1, num2);

        res.send(`A divisão de ${num1} e ${num2} é ${resultado}.`);
    } else {
        res.status(400).send('Os parâmetros devem ser números válidos.');
    }
});

const PORT = 8080;
const server = app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${server.address().port}`);
});