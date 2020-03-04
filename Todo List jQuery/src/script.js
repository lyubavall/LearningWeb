$(document).ready(function () {
    var toDoList = $("#todo-list-id");
    var newToDoField = $("#new-todo-field");
    var addButton = $("#add-button");

    function createTodoItem(text) {
        var li = $("<li>");
        var editButton = $("<button type='button' title='Edit item'>\u270E</button>");
        var deleteButton = $("<button type='button' title='Delete item'>\u00D7</button>");

        li.text(text);
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
        })
    }

    function editTodoItem(li, span, editButton, deleteButton) {
        var saveButton = $("<button type='button' title='Save'>💾</button>");
        var cancelButton = $("<button type='button' title='Cancel'>\u21bb</button>");
        var editField = $("<input type='text'>");
        var oldText = li[0].firstChild.textContent;

        editField.val(oldText);
        li[0].firstChild.textContent = "";

        span.append(saveButton);
        span.append(cancelButton);
        li.append(editField);

        editButton.hide();
        deleteButton.hide();

        saveButton.click(function () {
            if (editField.val() === "") {
                editField.attr("placeholder", "Enter a note")
            } else {
                li[0].firstChild.textContent = editField.val();
                editField.remove();
                saveButton.remove();
                cancelButton.remove();
                editButton.show();
                deleteButton.show();
            }
        });

        cancelButton.click(function () {
            li[0].firstChild.textContent = oldText;
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

    toDoList.click(function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        }
    });
});