if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
//const passport = require('passport');
// const login = require('./routes/login.js');
// const flash = require('express-flash');
// const session = require('express-session');


const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
//const loginRouter = login.router;
const registerRouter = require('./routes/register.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(login.passport.initialize());
// app.use(login.passport.session());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', error => console.log('Connected to db'));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(process.env.PORT || 3000);