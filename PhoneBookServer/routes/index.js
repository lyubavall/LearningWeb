var express = require('express');
var router = express.Router();

var contacts = [];
var newId = 1;

router.get("/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var filteredContacts = term.length === 0
        ? contacts
        : contacts.filter(function (contact) {
            return contact.name.toUpperCase().includes(term)
                || contact.surname.toUpperCase().includes(term)
                || contact.phone.toUpperCase().includes(term)
        });

    res.send(filteredContacts);
});

router.post("/deleteContacts", function (req, res) {
    var idSet = req.body.request;
    var contactsCountBeforeDeletion = contacts.length;

    var idSetMap = idSet.reduce(function (map, id) {
        map[id] = true;
        return map;
    }, {});

    contacts = contacts.filter(function (contact) {
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

router.post("/deleteContact", function (req, res) {
    var id = req.body.request;
    var contactsCountBeforeDeletion = contacts.length;

    contacts = contacts.filter(function (contact) {
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

router.post("/addContact", function (req, res) {
    var contact = req.body.request;

    if (contact.name === "" || contact.surname === "" || contact.phone === "") {
        res.send({
            success: false,
            message: "Not all fields are filled"
        });

        return;
    }

    var isDuplicatePhone = contacts.some(function (c) {
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
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
