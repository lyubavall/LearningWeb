$(document).ready(function () {
    var toDoList = $("#todo-list-id");
    var newToDoField = $("#new-todo-field");
    var addButton = $("#add-button");

    function createTodoItem(text) {
        var li = $("<li><label><input type='checkbox' name='' value='1'><span class='itemText'></span></label></li>");
        var editButton = $("<button type='button' title='Edit item'>\u270E</button>");
        var deleteButton = $("<button type='button' title='Delete item'>\u00D7</button>");

        li.find(".itemText").text(text);
        toDoList.append(li);

        var span = $("<span class='edit'></span>");

        span.append(deleteButton);
        span.append(editButton);
        li.append(span);

        deleteButton.click(function () {
            li.remove();
        });

        editButton.click(function () {
            editTodoItem(li, span, editButton, deleteButton);
        });

        li.find("label").click(function () {
            li.find(".itemText").toggleClass("checked", li.find("input").is(":checked"));
        });
    }

    function editTodoItem(li, span, editButton, deleteButton) {
        var saveButton = $("<button type='button' title='Save'>💾</button>");
        var cancelButton = $("<button type='button' title='Cancel'>\u21bb</button>");
        var editField = $("<input type='text'>");
        var oldText = li.find(".itemText").text();

        editField.val(oldText);
        li.find(".itemText").text("");

        span.append(saveButton);
        span.append(cancelButton);
        li.append(editField);

        editButton.hide();
        deleteButton.hide();

        saveButton.click(function () {
            if (editField.val() === "") {
                editField.attr("placeholder", "Enter a note")
            } else {
                li.find(".itemText").text(editField.val());
                editField.remove();
                saveButton.remove();
                cancelButton.remove();
                editButton.show();
                deleteButton.show();
            }
        });

        cancelButton.click(function () {
            li.find(".itemText").text(oldText);
            editField.remove();
            saveButton.remove();
            cancelButton.remove();
            editButton.show();
            deleteButton.show();
        });
    }

    addButton.click(function () {
        var text = newToDoField.val();

        if (text === "") {
            return;
        }

        createTodoItem(text);
        newToDoField.val("");
    });
});