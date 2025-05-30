const Sorting = require('./Sorting');

const sorter = new Sorting();

const originalArray = [5, 3, 8, 4, 2, 7, 1, 6];

// Função para verificar se o array está ordenado
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Bubble Sort (modifica o array original)
const bubbleArray = [...originalArray];
console.time("Bubble Sort");
sorter.bubbleSort(bubbleArray);
console.timeEnd("Bubble Sort");
console.log("Bubble Sort ordenado corretamente?", isSorted(bubbleArray));

// Selection Sort (modifica o array original)
const selectionArray = [...originalArray];
console.time("Selection Sort");
sorter.selectionSort(selectionArray);
console.timeEnd("Selection Sort");
console.log("Selection Sort ordenado corretamente?", isSorted(selectionArray));

// Merge Sort (retorna um novo array)
const mergeArray = [...originalArray];
console.time("Merge Sort");
const sortedMergeArray = sorter.mergeSort(mergeArray);
console.timeEnd("Merge Sort");
console.log("Merge Sort ordenado corretamente?", isSorted(sortedMergeArray));

// Quick Sort (retorna um novo array)
const quickArray = [...originalArray];
console.time("Quick Sort");
const sortedQuickArray = sorter.quickSort(quickArray);
console.timeEnd("Quick Sort");
console.log("Quick Sort ordenado corretamente?", isSorted(sortedQuickArray));

// Mostrar os arrays ordenados (opcional)
console.log("\nArrays ordenados:");
console.log("Bubble:", bubbleArray);
console.log("Selection:", selectionArray);
console.log("Merge:", sortedMergeArray);
console.log("Quick:", sortedQuickArray);
