const Sequelize = require('sequelize');
const db = require('./bd.js'); //Instância da conexão do Node com o BD

/*Criando o model Usuarios, com Sequelize, que representa a tabela Usuarios no banco de dados*/
const tabelaEstoqueVacinas = db.define('Estoques_Vacinas_Centros', {
    centro: {
        type: Sequelize.STRING,
        primaryKey:true
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pfizer: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    sputnik: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    astrazeneca: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    coronaVac: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    johnson: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, 
{
    // desabilitar os atributos a seguir inicializado por padrão pelo Sequelize
  
    createdAt: false,
    updatedAt: false
  
  })

/*Cria uma tabela no BD se não existir uma com nome Usuarios. Se existir, não faz nada, só reaproveita*/
tabelaEstoqueVacinas.sync();

module.exports = tabelaEstoqueVacinas;