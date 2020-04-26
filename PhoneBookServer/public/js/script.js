function PhoneBookService() {
    this.getContacts = function (term) {
        return $.get("/getContacts", {term: term});
    };

    this.addContact = function (contact) {
        return post("/addContact", contact);
    };

    this.deleteContacts = function (idSet) {
        return post("/deleteContacts", idSet);
    };

    this.deleteContact = function (id) {
        return post("/deleteContact", id);
    };
}

function post(url, data) {
    return $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify({request: data})
    });
}

Vue.component("add-contact", {
    props: {
        isConfirmedPhone: Boolean,
        contactsCount: null
    },
    data: function () {
        return {
            surname: "",
            name: "",
            phone: "",
            isSelected: false,
            attemptAdd: false,
            isDuplicatePhone: false
        }
    },
    template: "#add-contact-template",
    computed: {
        missingSurname: function () {
            return this.surname === "";
        },
        missingName: function () {
            return this.name === "";
        },
        missingPhone: function () {
            return this.phone === "";
        }
    },
    methods: {
        addContact: function () {
            this.attemptAdd = true;

            if (this.phone !== "") {
                this.$emit("confirm-phone", this.phone)
            }

            this.$nextTick(function () {
                this.isDuplicatePhone = this.isConfirmedPhone;

                if (this.missingSurname || this.missingName || this.missingPhone || this.isDuplicatePhone) {
                    return;
                }

                this.$emit("add-contact", {
                    name: this.name,
                    surname: this.surname,
                    phone: this.phone,
                    isSelected: false
                });

                this.surname = "";
                this.name = "";
                this.phone = "";
                this.attemptAdd = this.isSelected;
            });
        },
        cleanAddForm: function () {
            this.surname = "";
            this.name = "";
            this.phone = "";
            this.attemptAdd = false
        }
    }
});

Vue.component("search-panel", {
    data: function () {
        return {
            term: ""
        }
    },
    template: "#search-panel-template",
    methods: {
        search: function () {
            this.$emit("search-contact", this.term);
        },
        cancelSearch: function () {
            this.term = "";
            this.$emit("search-contact", this.term);
        }
    }
});

new Vue({
    el: "#phone-book",
    data: {
        service: new PhoneBookService(),

        contacts: [],
        showForm: false,
        currentContactId: null,
        isConfirmedPhone: false,
        isAllSelected: false
    },
    computed: {
        contactsLength: function () {
            return this.contacts.length;
        }
    },
    created: function () {
        this.getContacts();
    },
    methods: {
        getContacts: function (term) {
            if (term === undefined) {
                term = "";
            }

            var self = this;

            this.service.getContacts(term).done(function (contacts) {
                self.contacts = contacts;
            });
        },
        addContact: function (contact) {
            var self = this;

            this.service.addContact(contact).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.getContacts();
            });
        },
        confirmPhone: function (phone) {
            this.isConfirmedPhone = this.contacts.findIndex(function (contact) {
                return contact.phone.toUpperCase() === phone.toUpperCase();
            }) !== -1;
        },
        deleteContact: function (id) {
            var self = this;

            bootbox.confirm({
                message: "Удалить контакт?",
                buttons: {
                    confirm: {
                        label: 'Да'
                    },
                    cancel: {
                        label: 'Нет'
                    }
                },
                callback: function (result) {
                    if (!result) {
                        return;
                    }

                    self.service.deleteContact(id).done(function (response) {
                        if (!response.success) {
                            alert(response.message);
                            return;
                        }

                        self.getContacts();
                    });
                }
            });
        },
        deleteContacts: function () {
            var self = this;
            var idSet = [];

            this.contacts.forEach(function (contact) {
                if (contact.isSelected === true) {
                    idSet.push(contact.id);
                }
            });

            if (idSet.length === 0) {
                bootbox.alert("Нет выбранных контактов");
                return;
            }

            bootbox.confirm({
                message: "Удалить выбранные контакты?",
                buttons: {
                    confirm: {
                        label: 'Да'
                    },
                    cancel: {
                        label: 'Нет'
                    }
                },
                callback: function (result) {
                    if (!result) {
                        return;
                    }

                    self.service.deleteContacts(idSet).done(function (response) {
                        if (!response.success) {
                            alert(response.message);
                            return;
                        }

                        self.isAllSelected = false;
                        self.getContacts();
                    });
                }
            });
        },
        selectAll: function () {
            var self = this;
            this.contacts.forEach(function (contact) {
                contact.isSelected = !self.isAllSelected;
            });
        }
    }
});


