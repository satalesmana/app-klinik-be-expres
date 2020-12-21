var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('./User');
var VerifyToken = require(__root + 'app/auth/VerifyToken');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// CREATES A NEW USER
router.post('/', VerifyToken, function (req, res,next) {
    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', VerifyToken, function (req, res,next) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', VerifyToken, function (req, res,next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res,next) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id',  VerifyToken, async function (req, res,next) {
    let user_data = req.body;

    if(typeof(req.body.password) != "undefined"){
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        user_data.password = hashedPassword
    }

    User.findByIdAndUpdate(req.params.id, user_data, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user_data);
    });
});


module.exports = router;