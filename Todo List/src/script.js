document.addEventListener("DOMContentLoaded", function () {
    var toDoList = document.getElementById("todo-list-id");
    var newToDoField = document.getElementById("new-todo-field");
    var addButton = document.getElementById("add-button");

    function createTodoItem(text) {
        var li = document.createElement("li");
        var deleteButton = document.createElement("button");
        var editButton = document.createElement("button");

        li.textContent = text;
        toDoList.appendChild(li);

        var span = document.createElement("SPAN");

        deleteButton.textContent = "\u00D7";
        editButton.textContent = "\u270E";

        span.className = "edit";
        span.appendChild(deleteButton);
        span.appendChild(editButton);
        li.appendChild(span);

        deleteButton.addEventListener("click", function () {
            toDoList.removeChild(li);
        });

        editButton.addEventListener("click", function () {
            editTodoItem(li, span, editButton);
        })
    }

    function editTodoItem(el, parent, editButton) {
        var saveButton = document.createElement("button");
        var cancelButton = document.createElement("button");
        var editField = document.createElement("input");
        var oldText = el.firstChild.data;

        editField.value = el.firstChild.data;
        el.firstChild.data = "";

        el.appendChild(editField);
        parent.appendChild(saveButton);
        parent.appendChild(cancelButton);

        saveButton.textContent = "💾";
        cancelButton.textContent = "\u21bb";

        editButton.style.display = "none";

        saveButton.addEventListener("click", function () {
            el.firstChild.data = editField.value;
            el.removeChild(editField);
            parent.removeChild(saveButton);
            parent.removeChild(cancelButton);
            editButton.style.display = "inline-block";
        });

        cancelButton.addEventListener("click", function () {
            el.firstChild.data = oldText;
            el.removeChild(editField);
            parent.removeChild(saveButton);
            parent.removeChild(cancelButton);
            editButton.style.display = "inline-block";
        });
    }

    addButton.addEventListener("click", function () {
        var text = newToDoField.value;
        if (text === "") {
            return;
        }

        createTodoItem(text);

        newToDoField.value = "";
    });

    toDoList.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
        }
    });
});