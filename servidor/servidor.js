const express = require('express');
const cors = require('cors');
var XLSX = require('xlsx');
const tabelaUsuarioCadastro = require('./models/cadastro-usuario.js');
const tabelaAgendamentoVacina = require('./models/agendamento-vacina.js');
const tabelaRegistroVacinacao = require('./models/registro-vacinacao.js');
const tabelaEstoqueVacinas = require('./models/estoque-vacina.js');
const server = express();
const Usuario = require('./usuario.js');
const UsuarioADM = require('./usuario-administrador.js');
const AgendamentoVacina = require('./agendamento-vacina.js');
const RegistroVacinacao = require('./registro-vacinacao.js');
const ControleAgendamento = require('./controle/controle-agendamento.js');
const ControleRegistroVacina = require('./controle/controle-registro-vacinacao.js');
const ControleUsuario = require('./controle/controle-usuario.js');
const ControleUsuarioAdm = require('./controle/controle-usuario-adm.js');
const ControleEstoqueVacina = require('./controle/controle-estoque-vacina.js');
let dadosLocaisVacinacao;

const ControleUsuarioInst =  new ControleUsuario();
const ControleUsuarioAdmInst =  new ControleUsuarioAdm();
const ControleAgendamentoInst = new ControleAgendamento();
const ControleRegistroVacinaInst = new ControleRegistroVacina();
const ControleEstoqueVacinaInst = new ControleEstoqueVacina();

/*Pegando os dados do excel referente aos pontos de vacinação*/
async function getDadosPontosVacinacao() {
   
    const folhas =  XLSX.readFile("./servidor/dados-excel/dadosVacinacao.xlsx");
    const dadosJson = XLSX.utils.sheet_to_json(folhas.Sheets[folhas.SheetNames]);
    const dadosJsonInteresse = dadosJson.slice(2);
    
    let dadosJsonNormalizado = JSON.stringify(dadosJsonInteresse);
    dadosJsonNormalizado = dadosJsonNormalizado.replace(/__EMPTY_1/g, 'horario');
    dadosJsonNormalizado = dadosJsonNormalizado.replace(/__EMPTY/g, 'endereco');
    dadosJsonNormalizado = dadosJsonNormalizado.replace(/Locais de vacinação Covid-19 no Recife\/PE: centros e drive-thru/g, 'centro');

    dadosLocaisVacinacao = JSON.parse(dadosJsonNormalizado);

    for (let index = 0; index < dadosLocaisVacinacao.length; index++) {

        await tabelaEstoqueVacinas.create({
            centro:dadosLocaisVacinacao[index].centro,
            endereco:dadosLocaisVacinacao[index].endereco,
            pfizer: 100,
            sputnik: 100,
            astrazeneca: 100,
            coronaVac: 100,
            johnson: 100
        })
        .then(function () {
            console.log("Estoque criado com sucesso");
        })
        .catch (function (erro) {
            console.log(erro);
        });

    }

};

/*Selecionando os dados do BD*/
(async function () {
    const tabelaUsuario = await tabelaUsuarioCadastro.findAll();
    const tabelaAgendamento = await tabelaAgendamentoVacina.findAll();
    const tabelaVacinacao = await tabelaRegistroVacinacao.findAll();
    const tabelaEstoque = await tabelaEstoqueVacinas.findAll();

    /*Selecionando os dados da tabela Usuarios */
    for (let index = 0; index < tabelaUsuario.length; index++) {
        let usuarioDados = tabelaUsuario[index].dataValues;

        if (usuarioDados.credencial == null) {
            let tipoUsuario = new Usuario (
                usuarioDados.cpf,
                usuarioDados.nome,
                usuarioDados.email,
                usuarioDados.senha
                );

            ControleUsuarioInst.inserir(tipoUsuario);
        }else{
            let tipoUsuario = new UsuarioADM (
                usuarioDados.cpf,
                usuarioDados.nome,
                usuarioDados.email,
                usuarioDados.senha,
                usuarioDados.credencial
                );

            ControleUsuarioAdmInst.inserir(tipoUsuario);
        }
       
    }

    /*Selecionando os dados da tabela Agendamento_Vacinas */
    for (let index = 0; index < tabelaAgendamento.length; index++) {
        let agendamentoDados = tabelaAgendamento[index].dataValues;

        let agendamento = new AgendamentoVacina (
            agendamentoDados.cpf_agendamento,
            agendamentoDados.nome_pessoa,
            agendamentoDados.localidade,
            agendamentoDados.data_hora,
            agendamentoDados.dose
        )

        ControleAgendamentoInst.inserir(agendamento);
       
    }

    /*Selecionando os dados da tabela Registro_Vacinacoes */
    for (let index = 0; index < tabelaVacinacao.length; index++) {
        let vacinacaoDados = tabelaVacinacao[index].dataValues;
        
        let vacinacao = new RegistroVacinacao (
            vacinacaoDados.id,
            vacinacaoDados.cpf,
            vacinacaoDados.nome_pessoa,
            vacinacaoDados.localidade,
            vacinacaoDados.data_hora,
            vacinacaoDados.dose,
            vacinacaoDados.vacina
        )

        ControleRegistroVacinaInst.inserir(vacinacao);
       
    }

    /*Selecionando os dados da tabela Estoques_Vacinas_Centros */

    /*Descrição: Esse if faz uma verificação importante. Caso eu delete a tabela Estoques_Vacinas_Centros, tabelaEstoque.length seria igual a 0, portanto, iria chamar o método getDadosPontosVacinacao responsável povoar a esta tabela com o dados do excel. Ou seja, somente coloco os dados do excel em Estoques_Vacinas_Centros se não tiver nenhum dado nesta tabela. Caso contrário, se eu chamo getDadosPontosVacinacao() para todo início de programa, vai dá erro de inserção de chaves primárias duplicadas, uma vez que os dados que eu estou querendo inserir na tabela, já se encontram lá.*/

    if (tabelaEstoque.length == 0) {
        getDadosPontosVacinacao();
    }else {

        for (let index = 0; index < tabelaEstoque.length; index++) {
            let EstoquesDados = tabelaEstoque[index].dataValues;
            
            ControleEstoqueVacinaInst.inserir({
                centro: EstoquesDados.centro,
                endereco: EstoquesDados.endereco,
                pfizer: EstoquesDados.pfizer,
                sputnik: EstoquesDados.sputnik,
                astrazeneca: EstoquesDados.astrazeneca,
                coronaVac: EstoquesDados.coronaVac,
                johnson: EstoquesDados.johnson
            });
           
        }

    }

})()

server.use(express.json());
server.use(cors());

const porta = 2022; 

server.get("/", function (req, res) {
    res.send("Servidor conectado!");
});

server.post("/login", function (req, res) {
    
    let permissao = ControleUsuarioInst.buscarParaLogin(req.body.cpf, req.body.senha);

    if (permissao) {

        return res.json({
            erro: false,
            msg: "Acesso liberado"
        });
        
    }

    return res.status(400).json({
        erro: true,
        msg: "Não foi possível fazer o login"
    });
})

/* Para cadastro-usuario-adm, Servidor espera algo do tipo:
    { 
        "cpf": string,
        "nome": string,
        "email": string,
        "senha": string
    }
*/
server.post("/cadastro-usuario", async function (req, res) {

    let usuario = new Usuario(req.body.cpf, req.body.nome, req.body.email, req.body.senha);
    console.log(usuario);

    if (!ControleUsuarioInst.buscar(usuario)) {

        await tabelaUsuarioCadastro.create(req.body)
        .then(function () {
            ControleUsuarioInst.inserir(usuario);
            return res.json({
                erro: false,
                msg: "Usuario cadastrado com sucesso"
            });
        })
        .catch (function () {
            return res.status(400).json({
                erro: true,
                msg: "Não foi possível cadastrar o usuário"
            });
        })
        
    }else {

        return res.status(400).json({
            erro: true,
            msg: "Usuário já cadastrado"
        });

    }
    
});


/* Para cadastro-usuario-adm, Servidor espera algo do tipo:
    { 
        "cpf": string,
        "nome": string,
        "email": string,
        "senha": string,
        "credencial": string

    }
*/
server.post("/cadastro-usuario-adm", async function (req, res) {
    
    let usuario = new UsuarioADM(
        req.body.cpf, 
        req.body.nome, 
        req.body.email, 
        req.body.senha,
        req.body.credencial
        );

    if (!ControleUsuarioAdmInst.buscar(usuario)) {

        await tabelaUsuarioCadastro.create(req.body)
        .then(function () {
            ControleUsuarioAdmInst.inserir(usuario);
            return res.json({
                erro: false,
                msg: "Usuario cadastrado com sucesso"
            });
        })
        .catch (function () {
            return res.status(400).json({
                erro: true,
                msg: "Não foi possível cadastrar o usuário"
            });
        })
        
    }else {

        return res.status(400).json({
            erro: true,
            msg: "Usuário já cadastrado"
        });

    }

});


/* Para situacao-cpf-agendamento-vacina, Servidor espera algo do tipo:
    { 
        "cpf": string,
        "nome": string,
        "local": string,
        "data_hora": "2020-05-20 20:40:00",
        "dose": string

    }
*/
server.post("/agendamento-vacina", async function (req, res) {

    let agendamento = new AgendamentoVacina(
        req.body.cpf,
        req.body.nome,
        req.body.local,
        req.body.data_hora,
        req.body.dose
    )

    await tabelaAgendamentoVacina.create({
        cpf_agendamento:req.body.cpf,
        nome_pessoa:req.body.nome,
        localidade:req.body.local,
        data_hora:req.body.data_hora,
        dose:req.body.dose
    })
    .then(function () {
        ControleAgendamentoInst.inserir(agendamento);
        return res.json({
            erro: false,
            msg: "Vacinação agendada"
        });
    })
    .catch (function (erro) {
        console.log(erro)
        return res.status(400).json({
            erro: true,
            msg: "Não foi possível agendar a vacinação"
        });
    })

});
 

/* Para situacao-cpf-agendamento-vacina, Servidor espera algo do tipo:
    { 
        "cpf": string
    }
*/
//Descrição: Ao inserir o CPF para agendar, verifica-se se o usuário tem agendamento pendente.
server.get("/situacao-cpf-agendamento-vacina", async function (req, res) {

    let cpf = req.body.cpf;
   
    if(ControleAgendamentoInst.buscar(cpf)) {
        return res.json({
            status: true,
            msg: "Agendamento já cadastrado."
        });
    }else {
        return res.json({
            status: false,
            msg: "O agendamento pode ser solicitado."
        });
    }
        
});


/* Para cancelar-agendamento, Servidor espera algo do tipo:
    { 
        "cpf": string
    }
*/
server.delete("/cancelar-agendamento", async function (req, res) {

    await tabelaAgendamentoVacina.destroy({
        where: {
            cpf_agendamento: req.body.cpf
        }
    }).
    then(function () {
        ControleAgendamentoInst.delete(req.body.cpf);
        return res.json({
            erro:false,
            msg: "Agendamento cancelado com sucesso"
        })
    })
    .catch(function (erro) {
        console.log(erro);
        return res.status(400).json({
            erro:true,
            msg: "Não foi possível cancelar o agendamento"
        })
    });

});


/* Para registro-vacinacao, Servidor espera algo do tipo:
    { 
        "cpf": string,
        "vacina": string
    }
*/
server.post("/registro-vacinacao", async function (req, res) {

    let vacinaAgendada = ControleAgendamentoInst.getAgendamento(req.body.cpf);
    let id = ControleRegistroVacinaInst.getTamanho()+1;

    let registroVacina = new RegistroVacinacao(
        id,
        req.body.cpf,
        vacinaAgendada.nome,
        vacinaAgendada.local,
        vacinaAgendada.data_hora,
        vacinaAgendada.dose,
        req.body.vacina
    );

    await tabelaRegistroVacinacao.create({
        id: id,
        cpf:req.body.cpf,
        nome_pessoa:vacinaAgendada.nome,
        localidade:vacinaAgendada.local,
        data_hora:vacinaAgendada.data_hora,
        dose:vacinaAgendada.dose,
        vacina:req.body.vacina
    })
    .then(async function () {
        ControleRegistroVacinaInst.inserir(registroVacina);

        await tabelaAgendamentoVacina.destroy({
            where: {
                cpf_agendamento: req.body.cpf
            }
        }).
        then(function () {
            ControleAgendamentoInst.delete(req.body.cpf);
        })
        .catch(function (erro) {
            console.log(erro);
        });

        return res.json({
            erro: false,
            msg: "Vacinação registrada"
        });
    })
    .catch (function (erro) {
        console.log(erro)
        return res.status(400).json({
            erro: true,
            msg: "Não foi possível registrar a vacinação"
        });
    })

});


/* Para alterar-estoque, Servidor espera algo do tipo:
    { 
        "centro":"Centro de Saúde Bidu Krause",
        "vacina":"coronaVac"
    }
*/
server.post("/alterar-estoque", async function (req, res) {

    let estoqueCentro = ControleEstoqueVacinaInst.getEstoque(req.body.centro);
   
    switch (req.body.vacina) {
        case "pfizer":

            await tabelaEstoqueVacinas.update({ pfizer:  estoqueCentro.pfizer - 1}, {
                where: {
                  centro: req.body.centro
                }
            }).then(function () {
                ControleEstoqueVacinaInst.update(estoqueCentro.centro, "pfizer");
                return res.json({
                    erro: false,
                    msg: "Estoque atualizado com sucesso"
                });
            })
            .catch (function () {
                return res.status(400).json({
                    erro: true,
                    msg: "Não foi possível atualizar o estoque"
                });
            });
            
            break;

        case "sputnik":

            await tabelaEstoqueVacinas.update({ sputnik:  estoqueCentro.sputnik - 1}, {
                where: {
                  centro: req.body.centro 
                }
            }).then(function () {
                ControleEstoqueVacinaInst.update(estoqueCentro.centro, "sputnik");
                return res.json({
                    erro: false,
                    msg: "Estoque atualizado com sucesso"
                });
            })
            .catch (function () {
                return res.status(400).json({
                    erro: true,
                    msg: "Não foi possível atualizar o estoque"
                });
            });

            break;

        case "astrazeneca":

            await tabelaEstoqueVacinas.update({ astrazeneca:  estoqueCentro.astrazeneca - 1}, {
                where: {
                  centro: req.body.centro
                }
            }).then(function () {
                ControleEstoqueVacinaInst.update(estoqueCentro.centro, "astrazeneca");
                return res.json({
                    erro: false,
                    msg: "Estoque atualizado com sucesso"
                });
            })
            .catch (function () {
                return res.status(400).json({
                    erro: true,
                    msg: "Não foi possível atualizar o estoque"
                });
            });
            
            break;  

        case "coronaVac":

            await tabelaEstoqueVacinas.update({ coronaVac:  estoqueCentro.coronaVac - 1}, {
                where: {
                  centro: req.body.centro
                }
            }).then(function () {
                ControleEstoqueVacinaInst.update(estoqueCentro.centro, "coronaVac");
                return res.json({
                    erro: false,
                    msg: "Estoque atualizado com sucesso"
                });
            })
            .catch (function () {
                return res.status(400).json({
                    erro: true,
                    msg: "Não foi possível atualizar o estoque"
                });
            });
            
            break;

        case "johnson":

            await tabelaEstoqueVacinas.update({ johnson:  estoqueCentro.johnson - 1}, {
                where: {
                  centro: req.body.centro
                }
            }).then(function () {
                ControleEstoqueVacinaInst.update(estoqueCentro.centro, "johnson");
                return res.json({
                    erro: false,
                    msg: "Estoque atualizado com sucesso"
                });
            })
            .catch (function () {
                return res.status(400).json({
                    erro: true,
                    msg: "Não foi possível atualizar o estoque"
                });
            });
            
            break;
            
        default:
            break;
    }
    
});

server.listen(porta, function () {

    //Console.log não ta pegando aqui.

})