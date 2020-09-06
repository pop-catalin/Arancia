const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Task = require('../models/task.js');

router.get('/', checkAutheneticated, (req, res) => {
    res.render('index.ejs', {tasks: req.user.tasks});
});

router.post('/addTask', (req, res) => {
    User.findOne({email: req.user.email})
        .then(async user => {
            //console.log(user);
            console.log(req.body.taskName);
            const task = new Task.model({name: req.body.taskName});
            user.tasks.addToSet(task);
            console.log(user.tasks);
            await user.save();
            res.render('index.ejs', {tasks: user.tasks});
        }).catch(err => console.log(err));
})

router.post('/deleteTask', (req, res) => {
    console.log('xd');
    //User.findById(req.body.itemId).remove().exec();
    console.log(req.body.itemId);
    User.findOne({email: req.user.email})
        .then(async user => {
            console.log(user);
            //await user.remove().exec();
            user.tasks.pull(req.body.itemId);
            await user.save();
            res.redirect('./');
            res.render('index.ejs', {tasks: user.tasks});
        })
})

function checkAutheneticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;