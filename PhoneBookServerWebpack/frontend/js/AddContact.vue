<template>
    <div class="form-group py-3">
        <div class="pb-2">
            <label for="surname">Фамилия</label>
            <input v-model="surname" type="text" :class="{ 'is-invalid': attemptAdd && missingSurname }"
                   class="form-control" id="surname" required>
            <div class="invalid-feedback">Введите фамилию</div>
        </div>

        <div class="pb-2">
            <label for="name">Имя</label>
            <input v-model="name" type="text" :class="{ 'is-invalid': attemptAdd && missingName }" class="form-control"
                   id="name" required>
            <div class="invalid-feedback">Введите имя</div>
        </div>

        <div>
            <label for="phone">Номер телефона</label>
            <input v-model="phone" type="text"
                   :class="{ 'is-invalid': attemptAdd && (missingPhone || isDuplicatePhone) }"
                   class="form-control" id="phone" required>
            <div class="invalid-feedback">
                <div v-if="missingPhone">Введите телефон</div>
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
            isConfirmedPhone: Boolean,
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
            missingSurname() {
                return this.surname === "";
            },
            missingName() {
                return this.name === "";
            },
            missingPhone() {
                return this.phone === "";
            },
            id() {
                return this.contactsCount + 1;
            }
        },
        methods: {
            addContact() {
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
                    });

                    this.surname = "";
                    this.name = "";
                    this.phone = "";
                    this.attemptAdd = this.isSelected;
                });
            },
            cleanAddForm() {
                this.surname = "";
                this.name = "";
                this.phone = "";
                this.attemptAdd = false
            }
        }
    };
</script>