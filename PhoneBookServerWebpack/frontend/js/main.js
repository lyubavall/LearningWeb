import Vue from "vue";
import "bootstrap";
import bootbox from "bootbox";

import "bootstrap/dist/css/bootstrap.css"
import "../scss/style.scss"

import AddContact from "./AddContact.vue";
import SearchPanel from "./SearchPanel.vue";
import PhoneBookService from "./phoneBookService";

new Vue({
    el: "#phone-book",
    components: {
        "add-contact": AddContact,
        "search-panel": SearchPanel
    },
    data: {
        service: new PhoneBookService(),

        contacts: [],
        showForm: false,
        currentContactId: null,
        isAllSelected: false
    },
    created() {
        this.getContacts();
    },
    methods: {
        getContacts(term) {
            if (term === undefined) {
                term = "";
            }

            this.service.getContacts(term).done(contacts => {
                this.contacts = contacts;
            });
        },
        addContact(contact) {
            this.service.addContact(contact).done(response => {
                if (!response.success) {
                    if (response.isDuplicatePhone) {
                        this.$refs.addContactForm.showErrorPhoneMessage();
                        return;
                    } else {
                        alert(response.message);
                        return;
                    }
                }

                this.getContacts();
                this.$refs.addContactForm.cleanAddForm();
            });
        },
        deleteContact(id) {
            const self = this;

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
                callback(result) {
                    if (!result) {
                        return;
                    }

                    self.service.deleteContact(id).done(response => {
                        if (!response.success) {
                            alert(response.message);
                            return;
                        }

                        self.getContacts();
                        self.$refs.addContactForm.hideErrorPhoneMessage();
                    });
                }
            });
        },
        deleteContacts() {
            const self = this;
            const idSet = [];

            this.contacts.forEach(contact => {
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
                callback(result) {
                    if (!result) {
                        return;
                    }

                    self.service.deleteContacts(idSet).done(response => {
                        if (!response.success) {
                            alert(response.message);
                            return;
                        }

                        self.isAllSelected = false;
                        self.getContacts();
                        self.$refs.addContactForm.hideErrorPhoneMessage();
                    });
                }
            });
        },
        selectAll() {
            this.contacts.forEach(contact => contact.isSelected = !this.isAllSelected);
        }
    }
});