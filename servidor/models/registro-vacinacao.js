const Sequelize = require('sequelize');
const db = require('./bd.js'); //Instância da conexão do Node com o BD

/*Criando o model Usuarios, com Sequelize, que representa a tabela Usuarios no banco de dados*/
const TabelaRegistroVacinacao = db.define('Registro_Vacinacoes', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    cpf: {
        type: Sequelize.CHAR,
        allowNull: false
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
    },
    vacina: {
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
TabelaRegistroVacinacao.sync();

module.exports = TabelaRegistroVacinacao;