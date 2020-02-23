function ready() {
    var inputField = document.getElementById("input");
    var outFieldFahrenheit = document.getElementById("fahrenheit");
    var outFieldKelvin = document.getElementById("kelvin");
    var button = document.getElementById("button");

    button.addEventListener("click", function () {
        var inputTemperature = Number(inputField.value);
        if (!isNaN(inputTemperature)) {
            outFieldFahrenheit.value = inputTemperature * 9 / 5 + 32;
            outFieldKelvin.value = inputTemperature + 273.15;
        } else {
            alert("Введите число");
        }
    });
}

document.addEventListener("DOMContentLoaded", ready);