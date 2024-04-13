const express = require('express');
const estoque = require('./src/estoque');
const app = express();

app.get('/', function(req, res) {
    res.send('App Estoque');
})

app.get('/adicionar/:id/:nome/:qtd', function (req, res) {
    const { id, nome, qtd } = req.params;
    
    try {
        let p = estoque.criarProduto(id, nome, qtd);
        estoque.adicionarProduto(p);
        res.status(200).send(`O produto ${p.nome} foi adicionado com sucesso. Quantidade ${p.qtd}`);
    } catch {
        res.status(400).send('Faha ao cadastrar produto');
    }

});

app.get('/listar', function (req, res) {
    try {
        const produtos = estoque.listarProdutos();
        if(produtos.length === 0) {
            res.send('Lista de produtos está vazia');
        } else {
            res.send(produtos);
        }
    } catch {
        res.status(400).send('Falha ao listar produtos');
    }
});

app.get('/buscar/:id', function(req, res) {
    const id = req.params.id;

    try {
        res.status(200).send(estoque.buscarProduto(id));
    } catch {
        res.status(400).send('Falha ao buscar produto');
    }
});

// Simulando uma atualização PUT utilizando a chamada HTTP GET
app.get('/editar/:id/:qtd', function(req, res) {
    const { id, qtd } = req.params;

    let mensagem = estoque.editarProduto(id, qtd);

    if (mensagem === "Produto atualizado com sucesso!") {
        res.status(200).send(mensagem);
    } else {
        res.status(404).send(mensagem);
    }
});

app.get('/remover/:id', function (req, res) {
    let id = req.params.id;

    try {
        estoque.removerProduto(id);
        res.status(200).send(`Produto com ID: ${id} removido com sucesso.`);
    } catch {
        res.status(400).send('Falha ao remover produto');
    }
});

const PORT = 8080;
const server = app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${server.address().port}`);
});