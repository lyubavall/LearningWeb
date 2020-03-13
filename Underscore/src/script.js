(function () {
    var list = [
        {
            age: 85,
            name: "Victor",
            lastName: "Hugo"
        },
        {
            age: 55,
            name: "Charlotte",
            lastName: "Bronte"
        },
        {
            age: 10,
            name: "Leo",
            lastName: "Tolstoy"
        },
        {
            age: 25,
            name: "Mark",
            lastName: "Twain"
        },
        {
            age: 28,
            name: "Thomas",
            lastName: "Hardy"
        },
        {
            age: 20,
            name: "Stephen",
            lastName: "King"
        },
        {
            age: 30,
            name: "Oscar",
            lastName: "Wilde"
        },
        {
            age: 16,
            name: "William",
            lastName: "Shakespeare"
        },
        {
            age: 61,
            name: "Ernest",
            lastName: "Hemingway"
        }
    ];

    var averageAge = _.reduce(list, function (sum, person) {
        return sum + person.age;
    }, 0) / list.length || 1;

    console.log("Средний возраст: " + averageAge);

    var sortedList = _.chain(list)
        .filter(function (person) {
            return person.age <= 30 && person.age >= 20;
        })
        .sortBy("age")
        .value();

    console.log("Люди от 20 до 30 по возрастанию:");
    console.log(sortedList);

    _.map(list, function (person) {
        return _.extend(person, {fullName: person.name + " " + person.lastName});
    });

    console.log("Добавили поле fullName:");
    console.log(list);
})();