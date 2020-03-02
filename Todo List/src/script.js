document.addEventListener("DOMContentLoaded", function () {
    var toDoList = document.getElementById("todo-list-id");
    var newToDoField = document.getElementById("new-todo-field");
    var addButton = document.getElementById("add-button");

    function createTodoItem(text) {
        var li = document.createElement("li");
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");

        li.textContent = text;
        toDoList.appendChild(li);

        var span = document.createElement("SPAN");

        deleteButton.textContent = "\u00D7";
        deleteButton.setAttribute('title',"Delete item");
        editButton.textContent = "\u270E";
        editButton.setAttribute('title',"Edit item");

        span.className = "edit";
        span.appendChild(deleteButton);
        span.appendChild(editButton);
        li.appendChild(span);

        deleteButton.addEventListener("click", function () {
            toDoList.removeChild(li);
        });

        editButton.addEventListener("click", function () {
            editTodoItem(li, span, editButton, deleteButton);
        })
    }

    function editTodoItem(el, parent, editButton, deleteButton) {
        var saveButton = document.createElement("button");
        var cancelButton = document.createElement("button");
        var editField = document.createElement("input");
        var oldText = el.firstChild.textContent;

        editField.value = el.firstChild.textContent;
        el.firstChild.textContent = "";

        el.appendChild(editField);
        parent.appendChild(saveButton);
        parent.appendChild(cancelButton);

        saveButton.textContent = "💾";
        saveButton.setAttribute("title", "Save");
        cancelButton.textContent = "\u21bb";
        cancelButton.setAttribute("title", "Cancel");

        editButton.style.display = "none";
        deleteButton.style.display = "none";

        saveButton.addEventListener("click", function () {
            if(editField.value === ""){
                editField.setAttribute("placeholder", "Enter a note")
            }else {
                el.firstChild.textContent = editField.value;
                el.removeChild(editField);
                parent.removeChild(saveButton);
                parent.removeChild(cancelButton);
                editButton.style.display = "inline-block";
                deleteButton.style.display = "inline-block";
            }
        });

        cancelButton.addEventListener("click", function () {
            el.firstChild.textContent = oldText;
            el.removeChild(editField);
            parent.removeChild(saveButton);
            parent.removeChild(cancelButton);
            editButton.style.display = "inline-block";
            deleteButton.style.display = "inline-block";
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

    toDoList.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        }
    });
});