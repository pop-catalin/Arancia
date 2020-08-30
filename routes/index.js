const express = require('express');
const router = express.Router();

router.get('/', checkAutheneticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name});
});

function checkAutheneticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;