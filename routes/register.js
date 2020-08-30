const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// router.get('/', (req, res) => {
//     res.render('index.ejs', { name: 'req.user.name' });
// });

router.get('/', checkNotAuthenticated, (req, res) => {
    const message = req.session.message;
    res.render('register.ejs', {message: message});
});

router.post('/', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const message = await checkNewAccount(req.body.email, req.body.password);

        if(message === "") {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            const user = newUser.save();
            res.redirect('/login');
        } else {
            req.session.message = message;
            res.redirect('/register');
        }
    } catch {
        res.redirect('/register');
    }
});

async function checkNewAccount(email, password) {
    if (password.length < 6) {
        return "Password too short";
    }
    let message = "";
    await User.find({email: email})
        .then(user => {
            if(user) {
                message = "An account with this email already exists";
            }
        });
    return message;
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = router;