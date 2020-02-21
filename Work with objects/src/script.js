(function () {
    function createArray() {
        var italy = {
            name: "Italy",
            cities: [
                {name: "Rome", population: 4355725},
                {name: "Palermo", population: 676118},
                {name: "Milan", population: 1395274},
                {name: "Florence", population: 383083}
            ]
        };

        var switzerland = {
            name: "Switzerland",
            cities: [
                {name: "Bern", population: 133791},
                {name: "Geneva", population: 201741},
                {name: "Chur", population: 35373}
            ]
        };

        var spain = {
            name: "Spain",
            cities: [
                {name: "Madrid", population: 3223334},
                {name: "Zaragoza", population: 666880},
                {name: "Valencia", population: 798538}
            ]
        };

        var ireland = {
            name: "Ireland",
            cities: [
                {name: "Dublin", population: 1173179},
                {name: "Cork", population: 208669},
                {name: "Limerick", population: 94192}
            ]
        };

        var portugal = {
            name: "Portugal",
            cities: [
                {name: "Lisbon", population: 545245},
                {name: "Porto", population: 237559},
                {name: "Almada", population: 96404},
                {name: "Coimbra", population: 143052}
            ]
        };

        return [italy, switzerland, spain, ireland, portugal];
    }

    function getCountriesWithMaxCitiesCount(array) {
        var citiesMaxCount = array.reduce(function (max, country) {
            return max > country.cities.length ? max : country.cities.length;
        }, 0);
        var countries = [];

        for (var i = 0; i < array.length; ++i) {
            if (array[i].cities.length === citiesMaxCount) {
                countries.push(array[i].name);
            }
        }

        return countries;
    }

    console.log("Страны с максимальным количеством городов: " + getCountriesWithMaxCitiesCount(createArray()));

    function getCountriesPopulation(array) {
        var countriesPopulation = {};

        for (var i = 0; i < array.length; ++i) {
            countriesPopulation[array[i].name] = array[i].cities.reduce(function (sum, city) {
                return sum + city.population;
            }, 0);
        }

        return countriesPopulation;
    }

    function objectToString(object) {
        var properties = "";

        for (var key in object) {
            properties += key + ': ' + object[key] + '\n';
        }

        return properties;
    }

    console.log("Суммарная численность  по странам:\n" + objectToString(getCountriesPopulation(createArray())));
})();
