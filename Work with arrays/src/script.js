(function () {
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
        return array.reduce(function (sum, number) {
            if (number % 2 === 0) {
                sum += number;
            }

            return sum;
        }, 0);
    }

    function createArray() {
        var array = [];

        for (var i = 1; i <= 100; ++i) {
            array.push(i);
        }

        return array;
    }

    function getEvenNumbersSquares(array) {
        var evenNumbers = [];

        array.forEach(function (number) {
            if (number % 2 === 0) {
                evenNumbers.push(Math.pow(number, 2));
            }
        });

        return evenNumbers;
    }

    var array = [4, 8, -9, 0, 10, -1, 7, 1, 2, 5];

    console.log("Массив: " + array);
    console.log("Массив по убыванию: " + sortDescending(array));
    console.log("Первые 5 чисел: " + getFirstFiveElements(array));
    console.log("Последние 5 чисел: " + getLastFiveElements(array));
    console.log("Сумма четных чисел массива: " + getEvenNumbersSum(array));
    console.log("Список квадратов четных чисел массива от 1 до 100: " + getEvenNumbersSquares(createArray()));
})();
