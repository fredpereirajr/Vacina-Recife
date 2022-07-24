class ControleRegistroVacina {

    constructor () {
        this.registroVacinacao = new Array();
        this.size = 0;
    }

    inserir (elemento) {
        this.registroVacinacao.push(elemento);
        this.size++;
    }

    buscar (cpf) {
        for (let index = 0; index < this.agendamentoVacina.length; index++) {
            if (cpf == this.agendamentoVacina[index].cpf) {
                return true;
            }
            
        }

        return false;
    }

    getTamanho () {
        return this.size;
    }

}

module.exports = ControleRegistroVacina;
