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
            this.isConfirmedPhone = this.contacts.findIndex(function (contact) {
                return contact.phone === phone;
            }) !== -1;
        },
        deleteContact: function (contact) {
            var deletedContactsCount = 0;

            this.contacts = this.contacts.filter(function (e) {
                if ((e !== contact) && (e.isSelected === false)) {
                    e.id = e.id - deletedContactsCount;
                    return true;
                }

                ++deletedContactsCount;
                this.isAllSelected = false;
                return false;
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
        },
        cancelSearch: function () {

        },
        hideModal: function () {
            this.$refs['modal'].hide();
        },
        confirm: function () {
            var self = this;
            this.deleteContact(self.currentContact);
            this.$refs['modal'].hide();
        },
        showModal: function (contact) {
            this.$refs['modal'].show();
            this.currentContact = contact;
        }
    }
});


