Vue.component("add-form", {
    data: function () {
        return {
            newTodoText: "",
            newId: 1,
            isEmptyAdd: false
        };
    },
    template: "#add-form-template",
    methods: {
        addTodo: function () {
            if (this.newTodoText === "") {
                this.isEmptyAdd = true;
                return;
            }

            this.$emit("add-todo", {
                id: this.newId,
                text: this.newTodoText
            });

            this.newTodoText = "";
            this.isEmptyAdd = false;
            ++this.newId;
        }
    }
});

Vue.component("todo-items", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            revisedText: this.item.text,
            isEditing: false,
            isEmpty: false
        }
    },
    template: "#todo-items-template",
    methods: {
        deleteItem: function () {
            this.$emit("delete-item", this.item);
        },
        editItem: function () {
            this.isEditing = true;
        },
        saveItem: function () {
            if (this.revisedText === "") {
                this.isEmpty = true;
                return;
            }

            this.$emit("save-item", this.revisedText, this.item);
            this.isEditing = false;
            this.isEmpty = false;
        },
        cancelEdit: function () {
            this.isEditing = false;
            this.isEmpty = false;
        }
    }
});

new Vue({
    el: "#to-do-list",
    data: {
        list: []
    },
    methods: {
        addTodo: function (item) {
            this.list.push(item);
        },
        deleteItem: function (item) {
            this.list = this.list.filter(function (e) {
                return e !== item;
            });
        },
        saveItem: function (revisedText, item) {
            item.text = revisedText;
        }
    }
});