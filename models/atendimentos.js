const conexao = require('../infraestrutura/conexao')

const moment = require('moment')
const atendimentos = require('../controllers/atendimentos')

class Atendimento {
    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        //Validação de data, deve ser após a data de criação, de acordo com o nosso modelo de negócio. Retorna bool
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome : 'data',
                valido : dataEhValida,
                mensagem : 'Data deve ser maior ou igual à data atual'
            }, 
            {
                nome : 'cliente',
                valido : clienteEhValido,
                mensagem : 'Nome do cliente deve ter ao menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido )
        // Se existem valores com campos não-válidos
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}

        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if (erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(atendimento)
            }
        })    
        }
        

    }
}

module.exports = new Atendimento