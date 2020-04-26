import Vue from "vue";
import $ from "jquery";
import "bootstrap";
import bootbox from "bootbox";

import "bootstrap/dist/css/bootstrap.css"
import "../scss/style.css"

import AddContact from "./AddContact.vue";
import SearchPanel from "./SearchPanel.vue";

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
        isConfirmedPhone: false,
        isAllSelected: false
    },
    computed: {
        contactsLength() {
            return this.contacts.length;
        }
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
                    alert(response.message);
                    return;
                }

                this.getContacts();
            });
        },
        confirmPhone(phone) {
            this.isConfirmedPhone = this.contacts.findIndex(contact => {
                return contact.phone.toUpperCase() === phone.toUpperCase();
            }) !== -1;
        },
        deleteContact(id) {
            let self = this;

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
                    });
                }
            });
        },
        deleteContacts() {
            let self = this;
            let idSet = [];

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
                    });
                }
            });
        },
        selectAll() {
            this.contacts.forEach(contact => {
                contact.isSelected = !this.isAllSelected;
            });
        }
    }
});