if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const User = require('./models/user.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//connect database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', error => console.log('Connected to db'));

//passport config
require('./passport-config')(passport);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//passport and session initialize
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

//method override for DELETE to log out
app.use(methodOverride('_method'));

const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
const registerRouter = require('./routes/register.js');

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: 'Not found'
    });
   });

function checkAutheneticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

app.listen(3000);