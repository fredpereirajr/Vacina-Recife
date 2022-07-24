class RegistroVacinacao {
    constructor(id, cpf, nome, local, data_hora, dose, vacina) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.local = local;
        this.data_hora = data_hora;
        this.dose = dose;
        this.vacina = vacina;
    }
}

module.exports = RegistroVacinacao;