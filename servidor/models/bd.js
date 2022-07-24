/*Configurando conexão do Node com MYSQL*/
const Sequelize = require('sequelize');

/*Configurando a conexão com o db informando o nome do db, o usuário e senha do db*/
/*MUDAR SENHA DO BD*/
const sequelize = new Sequelize("Vacina_Recife", "root", "05071997",{
    host: 'localhost', //Local do DB
    dialect: 'mysql' //SGBD
  });

//Testando a conexão
sequelize.authenticate()
.then(function () {
    console.log("Conexão com o BD foi estabelecida!");
}).catch(function () {
    console.log("Não foi possível se conectar ao BD!")
})

//Exportando conexão 
module.exports = sequelize;