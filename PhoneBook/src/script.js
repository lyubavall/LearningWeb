$(document).ready(function () {
    var tbody = $("#tbody_id");
    var addButton = $("#add_button_id");
    var surnameField = $("#surname_id");
    var nameField = $("#name_id");
    var telField = $("#tel_id");
    var number = 1;

    function addNewContact(surname, name, tel) {
        var deleteButton = $("<button class='delete_button'>X</button>");
        var newRow = $("<tr><td class='number'>" + number + "</td><td>" + surname + "</td><td>" + name + "</td><td>" + tel + "</td><td></td></tr>");

        newRow.find("td").eq(4).append(deleteButton);
        tbody.append(newRow);
        ++number;

        deleteButton.click(function () {
            var nextRows = newRow.nextAll();

            nextRows.find("td.number").map(function () {
                var currentNumber = Number($(this).html());
                $(this).html(currentNumber - 1);
            });

            --number;
            newRow.remove();
        })
    }

    addButton.click(function () {
        var surname = surnameField.val();
        var name = nameField.val();
        var tel = telField.val();
        var requiredFields = $(".item input");

        if (surname === "" || name === "" || tel === "") {
            requiredFields.addClass("emptyField");
            surnameField.attr("placeholder", "Введите фамилию");
            nameField.attr("placeholder", "Введите имя");
            telField.attr("placeholder", "Введите телефон");

            return;
        }

        addNewContact(surname, name, tel);

        requiredFields.removeClass("emptyField");
        requiredFields.attr("placeholder", "");
        surnameField.val("");
        nameField.val("");
        telField.val("");
    })
});