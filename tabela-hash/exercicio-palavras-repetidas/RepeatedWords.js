const HashTable = require('../HashTable')

// Função para encontrar palavras repetidas em um texto
function findRepeatedWords(text){
    // Inicializa a tabela hash para armazenar contagem das palavras
    const hashTable = new HashTable();

    // Transforma o texto em minúsculas e divide em palavras separadas por espaço
    const words = text.toLowerCase().split(" ");

    // Array para guardar as palavras que aparecem mais de uma vez, sem repetição
    const repeated = [];

    // Conta a ocorrência de cada palavra no texto usando a hash table
    for ( let word of words){
        let count = hashTable.get(word) || 0; // Pega a contagem atual ou zero se não existir
        hashTable.set(word, count + 1);       // Atualiza a contagem
    }

    // Verifica quais palavras têm contagem maior que 1 e adiciona no array repeated
    for ( let word of words ){
        if ( hashTable.get(word) > 1 && !repeated.includes(word) ){
            repeated.push(word);
        }
    }

    // Retorna o array com as palavras repetidas encontradas no texto
    return repeated;
}

const text = "Este é um exemplo de texto onde um texto pode conter palavras repetidas";
console.log(findRepeatedWords(text));
