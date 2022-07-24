const Usuario = require('./usuario.js');

class UsuarioADM extends Usuario {

    constructor(cpf, nome, email, senha, credencial) {
        super(cpf, nome, email, senha);
        this.credencial = credencial;
    }

}

module.exports = UsuarioADM;