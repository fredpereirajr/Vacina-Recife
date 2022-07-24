const Sequelize = require('sequelize');
const db = require('./bd.js'); //Instância da conexão do Node com o BD

/*Criando o model Usuarios, com Sequelize, que representa a tabela Usuarios no banco de dados*/
const TabelaUsuarioCadastro = db.define('Usuarios', {
    cpf: {
        type: Sequelize.CHAR,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    credencial: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, 
{
    // desabilitar os atributos a seguir inicializado por padrão pelo Sequelize
  
    createdAt: false,
    updatedAt: false
  
  })

/*Cria uma tabela no BD se não existir uma com nome Usuarios. Se existir, não faz nada, só reaproveita*/
TabelaUsuarioCadastro.sync();

module.exports = TabelaUsuarioCadastro;