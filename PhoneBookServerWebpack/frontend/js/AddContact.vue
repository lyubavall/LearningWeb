<template>
    <div class="form-group py-3">
        <div class="pb-2">
            <label for="surname">Фамилия</label>
            <input v-model="surname" type="text" :class="{ 'is-invalid': attemptAdd && isMissingSurname }"
                   class="form-control" id="surname" required>
            <div class="invalid-feedback">Введите фамилию</div>
        </div>

        <div class="pb-2">
            <label for="name">Имя</label>
            <input v-model="name" type="text" :class="{ 'is-invalid': attemptAdd && isMissingName }"
                   class="form-control"
                   id="name" required>
            <div class="invalid-feedback">Введите имя</div>
        </div>

        <div>
            <label for="phone">Номер телефона</label>
            <input v-model="phone" type="text"
                   :class="{ 'is-invalid': attemptAdd && (isMissingPhone || isDuplicatePhone) }"
                   class="form-control" id="phone" required>
            <div class="invalid-feedback">
                <div v-if="isMissingPhone">Введите телефон</div>
                <div v-else>Контакт с таким номером уже существует</div>
            </div>
        </div>

        <button @click="addContact" class="btn btn-primary mt-2" type="button">Добавить контакт</button>
        <button @click="cleanAddForm" class="btn btn-primary mt-2" type="button">Очистить форму</button>
    </div>
</template>

<script>
    export default {
        props: {
            contactsCount: null
        },
        data() {
            return {
                surname: "",
                name: "",
                phone: "",
                isSelected: false,
                attemptAdd: false,
                isDuplicatePhone: false
            }
        },
        computed: {
            isMissingSurname() {
                return this.surname === "";
            },
            isMissingName() {
                return this.name === "";
            },
            isMissingPhone() {
                return this.phone === "";
            }
        },
        methods: {
            addContact() {
                this.attemptAdd = true;

                if (this.isMissingSurname || this.isMissingName || this.isMissingPhone) {
                    return;
                }

                this.$emit("add-contact", {
                    name: this.name,
                    surname: this.surname,
                    phone: this.phone,
                    isSelected: false,
                });
            },
            cleanAddForm() {
                this.surname = "";
                this.name = "";
                this.phone = "";
                this.attemptAdd = false
            },
            showErrorPhoneMessage() {
                this.isDuplicatePhone = true;
            },
            hideErrorPhoneMessage() {
                this.isDuplicatePhone = false;
            }
        }
    };
</script>