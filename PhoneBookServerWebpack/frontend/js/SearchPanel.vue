<template>
    <div class="search-panel">
        <div class="input-group">
            <input v-model="term" type="text" class="form-control" placeholder="Поиск"
                   aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary material-icons search-button" @click="search"
                        title="Найти контакт" type="button">search
                </button>
            </div>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary search-button" @click="cancelSearch" title="Отменить поиск"
                        type="button">Отмена
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                term: ""
            }
        },
        methods: {
            search() {
                this.$emit("search-contact", this.term);
            },
            cancelSearch() {
                this.term = "";
                this.$emit("search-contact", this.term);
            }
        }
    };
</script>