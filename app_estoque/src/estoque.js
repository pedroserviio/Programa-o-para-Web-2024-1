let produtos = [];

function criarProduto(id, nome, qtd) {
    let p = {
        id: id,
        nome: nome,
        qtd: qtd
    }

    return p;
}

function adicionarProduto(p) {
    const produtoExistente = produtos.find(produto => produto.id === p.id);
    
    // Se o produto já existir, exibir uma mensagem de erro
    if (produtoExistente) {
        console.error('Já existe um produto com o mesmo ID.');
    } else {
        produtos.push(p);
    }
}

function listarProdutos() {
    return produtos;
}

function buscarProduto(id) {
    const produto = produtos.find(produto => produto.id === id);
    if (produto) {
        return "Produto: " + produto.nome + "<br>" + 'Quantidade: ' + produto.qtd;
    } else {
        return "Produto não encontrado";
    }
}

function editarProduto(id, qtd) {
    const produtoIndex = produtos.findIndex(produto => produto.id === id);

    if (produtoIndex !== -1) {
        produtos[produtoIndex].qtd = qtd;

        return "Produto atualizado com sucesso!";
    } else {
        return "Produto não encontrado";
    }

}

function removerProduto(id) {
    try {
        produtos.pop(id);
    } catch {
        console.error('ID do produto errado ou inexistente');
    }
}

module.exports = {
    criarProduto,
    adicionarProduto,
    listarProdutos,
    buscarProduto,
    editarProduto,
    removerProduto
};