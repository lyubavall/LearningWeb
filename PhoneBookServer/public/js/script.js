function PhoneBookService() {
    this.getContacts = function (term) {
        return $.get("/getContacts?term=" + term);
    };

    this.addContact = function (contact) {
        return $.post({
            url: "/addContact",
            contentType: "application/json",
            data: JSON.stringify({request: contact})
        });
    };

    this.deleteContact = function (idSet) {
        return $.post({
            url: "/deleteContact",
            contentType: "application/json",
            data: JSON.stringify({idSet: idSet})
        });
    };
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
        },
        id: function () {
            return this.contactsCount + 1;
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
                    id: this.id,
                    name: this.name,
                    surname: this.surname,
                    phone: this.phone,
                    isSelected: false,
                    isShowing: true
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
        needForm: false,
        currentContactId: null,
        isConfirmedPhone: false,
        isAllSelected: false,
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
            var idSet = [id];

            this.contacts.forEach(function (contact) {
                if (contact.isSelected === true) {
                    idSet.push(contact.id);
                }
            });

            bootbox.confirm("Удалить контакт(ы)?", function (result) {
                if (result) {
                    self.service.deleteContact(idSet).done(function (response) {
                        if (!response.success) {
                            alert(response.message);
                            return;
                        }

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
        },
        search: function (searchText) {
            var text = searchText.toUpperCase();

            this.contacts.forEach(function (contact) {
                contact.isShowing = contact.name.toUpperCase().indexOf(text) >= 0
                    || contact.surname.toUpperCase().indexOf(text) >= 0
                    || contact.phone.toUpperCase().indexOf(text) >= 0
            });
        }
    }
});


