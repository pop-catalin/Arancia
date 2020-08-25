const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// router.get('/', (req, res) => {
//     res.render('index.ejs', { name: 'req.user.name' });
// });

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

router.post('/', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // users.push({
        //     id: Date.now().toString(),
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedPassword
        // })
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        console.log('newUser: ');
        console.log(newUser);
        const user = newUser.save();
        console.log(user);
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = router;