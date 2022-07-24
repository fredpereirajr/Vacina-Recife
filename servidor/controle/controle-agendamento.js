class ControleAgendamento {

    constructor () {
        this.agendamentoVacina = new Array();
    }

    inserir (elemento) {
        this.agendamentoVacina.push(elemento);
    }

    delete (cpf) {

        for (let index = 0; index < this.agendamentoVacina.length; index++) {
            if (cpf == this.agendamentoVacina[index].cpf) {
                this.agendamentoVacina.splice(index);
            }
            
        }
    }

    buscar (cpf) {
        for (let index = 0; index < this.agendamentoVacina.length; index++) {
            if (cpf == this.agendamentoVacina[index].cpf) {
                return true;
            }
            
        }

        return false;
    }

    getAgendamento (cpf) {
        for (let index = 0; index < this.agendamentoVacina.length; index++) {
            if (cpf == this.agendamentoVacina[index].cpf) {
                return this.agendamentoVacina[index];
            }
            
        }
    }

}

module.exports = ControleAgendamento;
