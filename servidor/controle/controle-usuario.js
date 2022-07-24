class ControleUsuario {
    constructor () {
        this.usuarios = new Array();
    }

    inserir (elemento) {
        this.usuarios.push(elemento);
    }

    buscar (elemento) {
        for (let index = 0; index < this.usuarios.length; index++) {
           
            if (elemento.cpf == this.usuarios[index].cpf) {
                return true;
            }
        }

        return false;
    }

    buscarParaLogin (cpf, senha) {
        
        for (let index = 0; index < this.usuarios.length; index++) {
            
            if (cpf == this.usuarios[index].cpf && senha == this.usuarios[index].senha) {
                return true;
            }
        }

        return false;
    }


}

module.exports = ControleUsuario;