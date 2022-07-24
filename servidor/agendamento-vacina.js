class AgendamentoVacina {
    constructor(cpf, nome, local, data_hora, dose) {
        this.cpf = cpf;
        this.nome = nome;
        this.local = local;
        this.data_hora = data_hora;
        this.dose = dose;
    }
}

module.exports = AgendamentoVacina;