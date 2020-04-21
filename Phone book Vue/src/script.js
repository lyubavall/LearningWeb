Vue.component("add-contact", {
    props: {
        isConfirmedPhone: Boolean,
        contactsCount: null
    },
    data: function () {
        return {
            id: "",
            surname: "",
            name: "",
            phone: "",
            isSelected: false,
            attemptAdd: false,
            duplicatePhone: false
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
                this.duplicatePhone = this.isConfirmedPhone;

                if (this.missingSurname || this.missingName || this.missingPhone || this.duplicatePhone) {
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

                ++this.id;
                this.surname = "";
                this.name = "";
                this.phone = "";
                this.attemptAdd = this.isSelected;
            });
        }
    }
});

Vue.component("search-panel", {
    data: function () {
        return {
            searchText: ""
        }
    },
    template: "#search-panel-template",
    methods: {
        search: function () {
            this.$emit("search-contact", this.searchText);
        },
        cancelSearch: function () {
            this.searchText = "";
            this.$emit("search-contact", this.searchText);
        }
    }
});

new Vue({
    el: "#phone-book",
    data: {
        contacts: [],
        needForm: false,
        currentContact: null,
        isConfirmedPhone: false,
        isAllSelected: false
    },
    computed: {
        contactsLength: function () {
            return this.contacts.length;
        }
    },
    methods: {
        addContact: function (contact) {
            this.contacts.push(contact);
        },
        confirmPhone: function (phone) {
            this.isConfirmedPhone = this.contacts.some(function (contact) {
                return contact.phone === phone;
            });
        },
        deleteContact: function (contact) {
            var self = this;

            bootbox.confirm({
                message: "Удалить контакт?",
                buttons: {
                    confirm: {
                        label: 'Да',
                    },
                    cancel: {
                        label: 'Нет',
                    }
                },
                callback: function (result) {
                    if (result) {
                        self.contacts = self.contacts.filter(function (e) {
                            return e !== contact;
                        });
                    }
                }
            });
        },
        deleteContacts: function (contact) {
            var isContactSelected = this.contacts.some(function (contact) {
                return contact.isSelected === true;
            });

            if (!isContactSelected) {
                bootbox.alert("Нет выбранных контактов");
                return;
            }

            var self = this;

            bootbox.confirm({
                message: "Удалить контакт?",
                buttons: {
                    confirm: {
                        label: 'Да',
                    },
                    cancel: {
                        label: 'Нет',
                    }
                },
                callback: function (result) {
                    if (result) {
                        self.contacts = self.contacts.filter(function (e) {
                            return e.isSelected === false;
                        });

                        self.isAllSelected = false;
                    }
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
                    || contact.phone.toUpperCase().indexOf(text) >= 0;

                if (contact.isShowing === false) {
                    contact.isSelected = false;
                }
            });
        }
    }
});


