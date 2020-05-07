import $ from "jquery";

export default class PhoneBookService {
    post(url, data) {
        return $.post({
            url: url,
            contentType: "application/json",
            data: JSON.stringify({request: data})
        });
    }

    getContacts(term) {
        return $.get("/getContacts", {term: term});
    }

    addContact(contact) {
        return this.post("/addContact", contact);
    }

    deleteContact(id) {
        return this.post("/deleteContact", id);
    }

    deleteContacts(idSet) {
        return this.post("/deleteContacts", idSet);
    }
}