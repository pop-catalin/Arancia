const express = require('express');
const router = express.Router();

router.get('/', checkAutheneticated, (req, res) => {
    console.log('chestii');
    console.log(req.user);
    res.render('index.ejs', {name: req.user.name});
});

function checkAutheneticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;