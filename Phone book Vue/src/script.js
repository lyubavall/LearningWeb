Vue.component("add-contact", {
    props: {
        isConfirmedPhone: Boolean
    },
    watch: {
        isConfirmedPhone: function (valueAfterConfirmation) {
            this.isConfirmedPhone = valueAfterConfirmation;
            console.log('Prop changed: ', valueAfterConfirmation);
        }
    },
    data: function () {
        return {
            surname: "",
            name: "",
            phone: "",
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
                console.log("nextTick in child component after emit: " + this.isConfirmedPhone);
            });

            this.duplicatePhone = this.isConfirmedPhone;

            if (this.missingSurname || this.missingName || this.missingPhone || this.duplicatePhone) {
                return;
            }

            this.$emit("add-contact", {
                name: this.name,
                surname: this.surname,
                phone: this.phone
            });

            this.surname = "";
            this.name = "";
            this.phone = "";
            this.attemptAdd = false;
        }
    }
});

new Vue({
    el: "#phone-book",
    data: {
        contacts: [],
        needForm: false,
        currentContact: null,
        isConfirmedPhone: false
    },
    methods: {
        addContact: function (contact) {
            this.contacts.push(contact);
        },
        confirmPhone: function (phone) {
            this.isConfirmedPhone = this.contacts.findIndex(function (contact) {
                return contact.phone === phone;
            }) !== -1;

            this.$nextTick(function () {
                console.log("nextTick in parent component in scream function: " + this.isConfirmedPhone);
            });
        },
        deleteContact: function (contact) {
            this.contacts = this.contacts.filter(function (e) {
                return e !== contact;
            });
        },
        hideModal: function () {
            this.$refs['modal'].hide();
        },
        confirm: function () {
            this.deleteContact(this.currentContact);
            this.$refs['modal'].hide();
        },
        showModal: function (contact) {
            this.$refs['modal'].show();
            this.currentContact = contact;
        }
    }
});

