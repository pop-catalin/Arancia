const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'No user with that email' });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect password '});
                    }
                });
            })
            .catch(err => console.log(err));
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
     });
}

module.exports = initialize;