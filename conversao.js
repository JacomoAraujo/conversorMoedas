async function obtemTaxas (moedaOrigem, moedaDestino) {
    const url = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`
    try{
        const response = await fetch (url)
        const data = await response.json()
        let retorno = data [`${moedaOrigem}${moedaDestino}`].bid
        resultado.textContent = retorno
    }
    catch (error) {
        console.error(error)
        return null
    }
}
async function calculaConversao(valor, moedaOrigem, moedaDestino){
    const valorNumerico = parseFloat(valor)
    if (! isNaN(valorNumerico)){  //NaN = not a number
        resultado.textContent= "O valor tem que ser numérico e válido"
    }
    if (moedaDestino && moedaOrigem && moedaOrigem !== moedaDestino){
        const taxaConversao = await obtemTaxas(moedaOrigem, moedaDestino)
        const valorConvertido = (valorNumerico * taxaConversao).toFixed(2)
        resultado.textContent = `o valor convertido é ${moedaDestino} ${valorConvertido}`
    } else {
        resultado.textContent = ""

    }
}
const moedaOrigem = document.getElementById('moedaOrigem')
const moedaDestino = document.getElementById('moedaDestino')
const valor = document.getElementById('valor')
const resultado = document.getElementById('resultado')


moedaOrigem.addEventListener('change', ()=> { calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)});
moedaDestino.addEventListener('change', ()=> { calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)});
valor.addEventListener('input',()=> { calculaConversao(valor.value, moedaOrigem.value, moedaDestino.value)});