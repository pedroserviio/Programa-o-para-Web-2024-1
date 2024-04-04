function transporMatriz(A) {
    function imprimirMatriz(matriz) {
        for (let i = 0; i < matriz.length; i++) {
            console.log(matriz[i].join('\t'));
        }
    }

    function transpor(A) {
        const transposta = [];
        const linhas = A.length;
        const colunas = A[0].length;

        for (let j = 0; j < colunas; j++) {
            transposta[j] = [];
            for (let i = 0; i < linhas; i++) {
                transposta[j][i] = A[i][j];
                //console.log('Transposta[j][i]' + transposta[j][i]);
            }
        }

        return transposta;
    }

    console.log("Matriz original:");
    imprimirMatriz(A);
    console.log("\nMatriz transposta:");
    imprimirMatriz(transpor(A));
}

module.exports = {transporMatriz};