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
    produtos.push(p);
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

function removerProduto(id) {
    // produtos = produtos.filter((p) => {
    //     let x = p.id != id;
    //     return x;
    // });
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
    removerProduto
};