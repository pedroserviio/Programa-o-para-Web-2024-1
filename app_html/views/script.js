// $(document).ready(function() {
//     $('#inputTelefone').mask('(99) 99999-9999');
//     $('#inputCEP').mask('99999-999');
// });

function buscarEnderecoPorCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        // Preenche os campos de endereço com os dados retornados pela API
        document.getElementById('inputLogradouro').value = data.logradouro;
        document.getElementById('inputEstado').value = data.uf;
        document.getElementById('inputCidade').value = data.localidade;
    })
    .catch(error => {
        console.error('Erro ao obter o endereço:', error);
    });
}

document.getElementById('inputCEP').addEventListener('change', function(event) {
    const cep = event.target.value.replace(/\D/g, ''); 
    if (cep.length === 8) { 
        buscarEnderecoPorCEP(cep);
    }
});

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
.then(response => response.json()).then(data => {
    const selectEstado = document.getElementById('inputEstado');

    data.forEach(estado => {
        const option = document.createElement('option');
        option.textContent = estado.nome;
        option.value = estado.sigla;
        selectEstado.appendChild(option);
    });
})
.catch(error => {
    console.error('Erro ao obter os estados:', error);
});


const agendarForm = document.getElementById('agendarForm');

// Cadastrar Agendamento
agendarForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById('inputNome').value;
    const telefone = document.getElementById('inputTelefone').value;
    const cep = document.getElementById('inputCEP').value;
    const logradouro = document.getElementById('inputLogradouro').value;
    const uf = document.getElementById('inputEstado').value;
    const cidade = document.getElementById('inputCidade').value;
    const dt_agendamento = document.getElementById('inputData').value;

    // Verifique se os campos obrigatórios estão preenchidos
    if (nome && telefone && cep && logradouro && uf && cidade && dt_agendamento) {
        const formData = {
            nome,
            telefone,
            endereco: {
                cep,
                logradouro,
                uf,
                cidade
            },
            dt_agendamento
        };

        fetch('/dados/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            Toastify({
                text: "Angendamento com sucesso!",
                duration: 3000,
                gravity: "top",
                style: {
                    background: "#4CAF50",
                }
            }).showToast();

            setTimeout(function() {
                window.location.href = "/dados";
            }, 1000);
        })
        .catch(error => {
            console.error('Erro:', error);
            Toastify({
                text: "Erro no agendamento. Por favor, tente novamente mais tarde.",
                duration: 3000,
                gravity: "top",
                style: {
                    background: "red",
                }
            }).showToast();
        });
    }
});

let btnAgendamento = document.getElementById('btnAgendamento');
btnAgendamento.addEventListener('click', function() {
    window.location.href = '/dados';
});