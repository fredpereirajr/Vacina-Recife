const Sequelize = require('sequelize');
const db = require('./bd.js'); //Instância da conexão do Node com o BD

/*Criando o model Usuarios, com Sequelize, que representa a tabela Usuarios no banco de dados*/
const TabelaAgendamentoVacina = db.define('Agendamento_Vacinas', {
    cpf_agendamento: {
        type: Sequelize.CHAR,
        allowNull: false,
        primaryKey: true
    },
    nome_pessoa: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    localidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_hora: {
        type: 'DATETIME',
        allowNull: false
    },
    dose: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, 
{
    // desabilitar os atributos a seguir inicializado por padrão pelo Sequelize
  
    createdAt: false,
    updatedAt: false
  
  })

/*Cria uma tabela no BD se não existir uma com nome Usuarios. Se existir, não faz nada, só reaproveita*/
TabelaAgendamentoVacina.sync();

module.exports = TabelaAgendamentoVacina;