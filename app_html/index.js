const express = require('express');
const cors = require('cors');
const app = express();

function initMiddleware() {
    app.use(cors());
    app.use(express.json());
    app.use(express.static("views"));
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/contato', function (req, res) {
    res.sendFile(__dirname + '/views/contato.html');
});

initMiddleware();

const PORT = 8080;
const server = app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${server.address().port}`)
});