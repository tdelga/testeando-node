var admin = require("firebase-admin");

var serviceAccount = require("../../test-node-ce183-firebase-adminsdk-107kt-1815b4e28b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-node-ce183-default-rtdb.firebaseio.com"
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {

    db.ref('contacts').once('value', (snapshot) => {
        console.log(snapshot.val())
       data = snapshot.val();
       res.render('index', {contacts: data})
    });
})

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;