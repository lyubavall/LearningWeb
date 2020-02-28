(function () {
        var array = [
            {
                name: "Italy",
                cities: [
                    {name: "Rome", population: 4355725},
                    {name: "Palermo", population: 676118},
                    {name: "Milan", population: 1395274},
                    {name: "Florence", population: 383083}
                ]
            },
            {
                name: "Switzerland",
                cities: [
                    {name: "Bern", population: 133791},
                    {name: "Geneva", population: 201741},
                    {name: "Chur", population: 35373}
                ]
            },
            {
                name: "Spain",
                cities: [
                    {name: "Madrid", population: 3223334},
                    {name: "Zaragoza", population: 666880},
                    {name: "Valencia", population: 798538}
                ]
            },
            {
                name: "Ireland",
                cities: [
                    {name: "Dublin", population: 1173179},
                    {name: "Cork", population: 208669},
                    {name: "Limerick", population: 94192}
                ]
            },
            {
                name: "Portugal",
                cities: [
                    {name: "Lisbon", population: 545245},
                    {name: "Porto", population: 237559},
                    {name: "Almada", population: 96404},
                    {name: "Coimbra", population: 143052}
                ]
            }
        ];

        function getCountriesWithMaxCitiesCount(array) {
            var citiesMaxCount = array.reduce(function (max, country) {
                return Math.max(max, country.cities.length);
            }, 0);

            return array.filter(function (country) {
                return country.cities.length === citiesMaxCount;
            });
        }

        console.log("Страны с максимальным количеством городов:");
        console.log(getCountriesWithMaxCitiesCount(array));

        function getCountriesPopulation(array) {
            var countriesPopulation = {};

            array.forEach(function (country) {
                countriesPopulation[country.name] = country.cities.reduce(function (sum, city) {
                    return sum + city.population;
                }, 0);
            });

            return countriesPopulation;
        }

        console.log("Суммарная численность  по странам:");
        console.log(getCountriesPopulation(array));
    }
)();
