const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
//const login = require('./routes/login.js');
const flash = require('express-flash');
const session = require('express-session');

router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

// function findUser(email, callback) {
//     User.findOne({email: email}, function(err, userObj){
//         if(err){
//             return callback(err);
//         } else if (userObj){
//             return callback(null,userObj);
//         } else {
//             return callback();
//         }
//     });
// }

// findUser('test@test', function(error, userFound) {
//     console.log(userFound);
//     });

const initializePassport = require('./passport-config.js');
initializePassport(
    passport,
    async email => {
        // console.log('xdd' + email);
        // const theUser = new User({
        //     name: User.find({ email: email}).select('name -_id'),
        //     email: User.find({ email: email}).select('email -_id'),
        //     password: User.find({ email: email}).select('password -_id')
        // });
        //console.log('xd' + User.find({ email: email}).select('name -_id'));
        //console.log(theUser);
        //const userr = User.findOne({ email: email}, function(err,obj) { console.log(obj); });
        const userr = await User.findOne({ email: email});
        //console.log(userr);
        //console.log(userr);
        return userr;
    });

router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
//module.exports.passport = passport;