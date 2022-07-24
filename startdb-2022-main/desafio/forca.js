let palavraOculta="";
let vidas = 6;
let estado = "aguardando chute";
let palavra = [];
let letrasUsadas = [];

class Forca {

    constructor(palavraProposta) {
        palavraOculta = palavraProposta;
        for (let indice = 0; indice < palavraOculta.length; indice++) {
            palavra[indice] = "_";
        }
    }

    chutar(letra) {
        this.validarLetraChutada(letra);
    }

    buscarEstado() {                                          // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
        return estado;
    }

    buscarDadosDoJogo() {
        this.atualizarEstado();
        return {
            letrasChutadas: letrasUsadas,                     // Deve conter todas as letras chutadas
            vidas: vidas,                                     // Quantidade de vidas restantes
            palavra: palavra                                  // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
        }
    }

    validarChute(letra) {
        return !(letra.length > 1 || letrasUsadas.includes(letra));
    }

    revelarLetra(letra, indice) {
        palavra[indice] = letra;
    }

    atualizarEstado() {
        if (!palavra.join("").includes("_") && vidas > 0) estado = "ganhou";
        else if (vidas === 0) estado = "perdeu";
    }

    validarLetraChutada(letra) {
        let letraEncontrada = false;
        if (this.validarChute(letra)) {
            letrasUsadas.push(letra);
            for (let indice = 0; indice < palavraOculta.length; indice++) {
                if (palavraOculta.charAt(indice) === letra) {
                    letraEncontrada = true;
                    this.revelarLetra(letra, indice);
                }
            }
            if (!letraEncontrada) vidas--;
        }
    }

}
module.exports = Forca;