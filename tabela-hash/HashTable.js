class HashTable {
    constructor(size = 53) {
        this.buckets = new Array(size); // Array que armazena os "baldes" (listas) para colisões
        this.size = size;               // Tamanho da tabela hash
    }

    // Método privado para calcular o índice da chave no array buckets
    // Usa uma função hash simples com fator primo para distribuir uniformemente
    #hash(key) {
        let total = 0;
        const PRIME = 31; // Número primo para ajudar na dispersão dos valores
        // Limita o processamento da string para até 100 caracteres para evitar overhead
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96; // converte 'a' -> 1, 'b' -> 2, etc.
            total = (total * PRIME + value) % this.size; // calcula índice circularmente no tamanho da tabela
        }
        return total;
    }

    // Insere ou atualiza um par chave-valor na tabela
    set(key, value) {
        const index = this.#hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = []; // cria um bucket (lista) caso não exista para tratar colisões
        }

        // Se a chave já existir, atualiza o valor
        for (let item of this.buckets[index]) {
            if (item.key === key) {
                item.value = value;
                return;
            }
        }

        // Caso contrário, adiciona um novo par chave-valor
        this.buckets[index].push({ key, value });
    }

    // Retorna o valor associado à chave ou undefined se não existir
    get(key) {
        const index = this.#hash(key);
        if (!this.buckets[index]) return undefined;

        // Busca linear dentro do bucket para encontrar a chave
        for (let item of this.buckets[index]) {
            if (item.key === key) {
                return item.value;
            }
        }
        return undefined; // chave não encontrada
    }

    // Remove o par chave-valor da tabela, retornando true se removido, false caso contrário
    remove(key) {
        const index = this.#hash(key);
        if (!this.buckets[index]) return false;

        const bucket = this.buckets[index];

        // Busca e remove o item no bucket
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false; // chave não encontrada para remoção
    }
}

module.exports = HashTable;
