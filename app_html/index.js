const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

// let agendamentos = JSON.parse(fs.readFileSync('./db.json'));

function initMiddleware() {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("views"));
}

initMiddleware();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/dados', function (req, res) {
    res.sendFile(__dirname + '/views/dados.html');
});

app.get('/dados/listar', function(req, res) {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao ler o arquivo de banco de dados."
            });
        }

        try {
            const db = JSON.parse(data);

            res.status(200).json(db);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao analisar o arquivo de banco de dados."
            });
        }
    });
});

app.post('/dados/cadastrar', function(req, res) {
    const novoAgendamento = req.body;
    console.log(novoAgendamento);

    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao ler o arquivo de banco de dados."
            });
        }

        try {
            const db = JSON.parse(data);

            db.agendamentos.push(novoAgendamento);

            fs.writeFile('./db.json', JSON.stringify(db, null, 4), (error) => {
                if (error) {
                    
                    return res.status(500).json({
                        status: "error",
                        message: "Erro ao escrever no arquivo de banco de dados."
                    });
                }

                
                res.status(200).json({
                    status: "success",
                    data: {
                        agendamento: novoAgendamento
                    }
                });
            });
        } catch (error) {

            return res.status(500).json({
                status: "error",
                message: "Erro ao analisar o arquivo de banco de dados."
            });
        }
    });
});

const PORT = 8080;
const server = app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${server.address().port}`)
});