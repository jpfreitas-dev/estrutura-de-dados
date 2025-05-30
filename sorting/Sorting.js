class Sorting {
    // Bubble Sort: percorre o array várias vezes, trocando elementos adjacentes fora de ordem.
    // Complexidade: O(n²) no pior caso. Simples, mas ineficiente para arrays grandes.
    bubbleSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Troca os elementos fora de ordem
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }

    // Selection Sort: encontra o menor valor e o move para a posição correta.
    // Complexidade: O(n²) mesmo no melhor caso. Evita trocas desnecessárias comparado ao Bubble.
    selectionSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            // Troca apenas se o menor elemento não estiver na posição correta
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            }
        }
        return arr;
    }

    // Merge Sort: algoritmo recursivo que divide o array em duas partes,
    // ordena cada parte e depois faz a mesclagem ordenada.
    // Complexidade: O(n log n) em todos os casos. Estável e eficiente.
    mergeSort(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = this.mergeSort(arr.slice(0, mid));
        const right = this.mergeSort(arr.slice(mid));

        return this.#merge(left, right);
    }

    // Função auxiliar privada que mescla dois arrays ordenados em um só.
    #merge(left, right) {
        const result = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }

        // Junta o restante dos elementos, se houver
        return result.concat(left.slice(i)).concat(right.slice(j));
    }

    // Quick Sort: escolhe um pivô e separa os menores à esquerda e maiores à direita.
    // Complexidade média: O(n log n). Pior caso: O(n²) (quando o array já está ordenado).
    // Usa recursão e espalhamento para gerar novo array.
    quickSort(arr) {
        if (arr.length < 1) return arr;

        const pivot = arr[arr.length - 1];
        const left = [];
        const right = [];

        // Particiona o array em dois subarrays com base no pivô
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        // Concatena: [menores] + pivot + [maiores], recursivamente ordenados
        return [...this.quickSort(left), pivot, ...this.quickSort(right)];
    }
}

module.exports = Sorting;
