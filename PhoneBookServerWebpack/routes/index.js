const express = require('express');
const router = express.Router();

let contacts = [];
let newId = 1;

router.get("/getContacts", (req, res) => {
    const term = (req.query.term || "").toUpperCase();

    const filteredContacts = term.length === 0
        ? contacts
        : contacts.filter(contact => {
            return contact.name.toUpperCase().includes(term)
                || contact.surname.toUpperCase().includes(term)
                || contact.phone.toUpperCase().includes(term)
        });

    res.send(filteredContacts);
});

router.post("/deleteContacts", (req, res) => {
    const idSet = req.body.request;
    const contactsCountBeforeDeletion = contacts.length;

    const idSetMap = idSet.reduce((map, id) => {
        map[id] = true;
        return map;
    }, {});

    contacts = contacts.filter(contact => {
        return !idSetMap[contact.id];
    });

    if (contactsCountBeforeDeletion === contacts.length) {
        res.send({
            success: false,
            message: "Removal failed"
        });

        return;
    }

    res.send({
        success: true,
        message: null
    });
});

router.post("/deleteContact", (req, res) => {
    const id = req.body.request;
    const contactsCountBeforeDeletion = contacts.length;

    contacts = contacts.filter(contact => {
        return contact.id !== id;
    });

    if (contactsCountBeforeDeletion === contacts.length) {
        res.send({
            success: false,
            message: "Removal failed"
        });

        return;
    }

    res.send({
        success: true,
        message: null
    });
});

router.post("/addContact", (req, res) => {
    const contact = req.body.request;

    if (contact.name === "" || contact.surname === "" || contact.phone === "") {
        res.send({
            success: false,
            message: "Not all fields are filled"
        });

        return;
    }

    const isDuplicatePhone = contacts.some(c => {
        return c.phone.toUpperCase() === contact.phone.toUpperCase();
    });

    if (isDuplicatePhone) {
        res.send({
            success: false,
            message: "Contact with this phone already exists"
        });

        return;
    }

    contact.id = newId;
    ++newId;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

module.exports = router;