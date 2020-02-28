document.addEventListener("DOMContentLoaded", function () {
    var inputField = document.getElementById("input");
    var outFieldFahrenheit = document.getElementById("fahrenheit");
    var outFieldKelvin = document.getElementById("kelvin");
    var button = document.getElementById("button");

    button.addEventListener("click", function () {
        var inputTemperature = inputField.value;

        if (inputTemperature === "" || isNaN(Number(inputTemperature))) {
            alert("Введите число");
        } else {
            outFieldFahrenheit.value = (Number(inputTemperature) * 9 / 5 + 32).toFixed(4);
            outFieldKelvin.value = (Number(inputTemperature) + 273.15).toFixed(4);
        }
    });
});