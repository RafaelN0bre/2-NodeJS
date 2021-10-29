// Setando o express para poder chamá-lo

const express = require('express')

// Executando o express 

const app = express()

//Subindo servidor
// Para rodar, basta --> node index.js
app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

//Adicionando um get padrão
// É necessário derrubar o servidor e rodar novamente, nõa basta atualizar a página
    //app.get('/', (req, res) => res.send('Servidor rodando, tudo ok'))
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e está realizando um GET'))
