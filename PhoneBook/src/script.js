$(document).ready(function () {
    var tbody = $("#tbody_id");
    var addButton = $("#add_button_id");
    var surnameField = $("#surname_id");
    var nameField = $("#name_id");
    var telephoneField = $("#tel_id");
    var number = 1;

    function addNewContact(surname, name, telephone) {
        var deleteButton = $("<button class='delete_button' title='Delete contact'>X</button>");
        var newRow = $("<tr><td class='number'>" + number + "</td><td class='surname'>" + "</td><td class='name'>" + "</td><td class='telephone'>" + "</td><td class='deleteButton'></td></tr>");

        newRow.find("td.surname").text(surname);
        newRow.find("td.name").text(name);
        newRow.find("td.telephone").text(telephone);
        newRow.find("td.deleteButton").append(deleteButton);
        tbody.append(newRow);
        ++number;

        deleteButton.click(function () {
            var nextRows = newRow.nextAll();

            nextRows.find("td.number").each(function () {
                $(this).html(Number($(this).html()) - 1);
            });

            --number;
            newRow.remove();
        });
    }

    addButton.click(function () {
        var surname = surnameField.val();
        var name = nameField.val();
        var telephone = telephoneField.val();
        var requiredFields = $(".item input");

        if (surname === "" || name === "" || telephone === "") {
            requiredFields.addClass("emptyField");
            surnameField.prop("placeholder", "Введите фамилию");
            nameField.prop("placeholder", "Введите имя");
            telephoneField.prop("placeholder", "Введите телефон");

            return;
        }

        addNewContact(surname, name, telephone);

        requiredFields.removeClass("emptyField");
        requiredFields.prop("placeholder", "");
        surnameField.val("");
        nameField.val("");
        telephoneField.val("");
    });
});