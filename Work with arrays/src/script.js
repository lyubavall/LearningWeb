let list = [4, 8, -9, 0, 10, -1, 7, 1, 2, 5];

function sortDescending(array) {
    return array.sort(function (e1, e2) {
        return e2 - e1;
    })
}

function getFirstFiveElements(array) {
    return array.slice(0, 5);
}

function getLastFiveElements(array) {
    return array.slice(array.length - 5);
}

function getEvenNumbersSum(array) {
    let sum = 0;

    for (let i = 0; i < array.length; ++i) {
        if (array[i] % 2 === 0) {
            sum += array[i];
        }
    }

    return sum;
}

function createArray() {
    let array = [];

    for (let i = 1; i <= 100; ++i) {
        array.push(i);
    }

    return array;
}

function getEvenNumbersSquares(array) {
    let evenList = [];

    for (let i = 0; i < array.length; ++i) {
        if (array[i] % 2 === 0) {
            evenList.push(Math.pow(array[i], 2));
        }
    }

    return evenList;
}

console.log("Массив: " + list);
console.log("Массив по убыванию: " + sortDescending(list));
console.log("Первые 5 чисел: " + getFirstFiveElements(list));
console.log("Последние 5 чисел: " + getLastFiveElements(list));
console.log("Сумма четных чисел массива: " + getEvenNumbersSum(list));
console.log("Список квадратов четных чисел массива от 1 до 100: " + getEvenNumbersSquares(createArray()));