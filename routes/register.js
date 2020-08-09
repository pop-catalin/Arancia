const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register.ejs', { user: new User() });
});

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(newUser);
        const user = await newUser.save();
        console.log(user);
        res.redirect('/login');
    }
    catch {
        res.redirect('/register');
    }
});

module.exports = router;