class ControleEstoqueVacina {

    constructor () {
        this.estoquesVacina = new Array();
        this.size = 0;
    }

    inserir (elemento) {
        this.estoquesVacina.push(elemento);
        this.size++;
    }

    update (centro,  vacina) {

        for (let index = 0; index < this.estoquesVacina.length; index++) {
            if (centro == this.estoquesVacina[index].centro) {

                switch (vacina) {
                    case "pfizer":
                        this.estoquesVacina[index].pfizer--;
                        break;
                    case "sputnik":
                        this.estoquesVacina[index].sputnik--;
                        break;
                    case "astrazeneca":
                        this.estoquesVacina[index].astrazeneca--;
                        break;  
                    case "coronaVac":
                        this.estoquesVacina[index].coronaVac--;
                        break;
                    case "johnson":
                        this.estoquesVacina[index].johnson--;
                        break;
                    default:
                        break;
                }
                
            }
            
        }
    }

    buscar (centro) {
        for (let index = 0; index < this.estoquesVacina.length; index++) {
            if (centro == this.estoquesVacina[index].centro) {
                return true;
            }
            
        }

        return false;
    }

    getEstoque (centro) {
        for (let index = 0; index < this.estoquesVacina.length; index++) {
            if (centro == this.estoquesVacina[index].centro) {
                return this.estoquesVacina[index];
            }
            
        }
    }

    getTamanho () {
        return this.size;
    }

}

module.exports = ControleEstoqueVacina;
