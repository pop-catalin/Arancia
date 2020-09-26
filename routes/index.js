const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Task = require('../models/task.js');

router.get('/', checkAutheneticated, (req, res) => {
    res.render('index.ejs', {tasks: req.user.tasks});
});

router.post('/addTask', validateTask, (req, res) => {
    User.findOne({email: req.user.email})
        .then(async user => {
            var task = new Task.model({name: req.body.name});
            user.tasks.addToSet(task);
            await user.save();

            res.send({ task: task, length: user.tasks.length });
        }).catch(err => console.log(err));
});

router.post('/deleteTask/:id', (req, res) => {
    const id = req.params.id;

    User.findOne({email: req.user.email})
        .then(async user => {
            user.tasks.pull(id);
            await user.save();
            res.send({ id: id, length: user.tasks.length });
        })
})

function checkAutheneticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function validateTask(req, res, next) {
    if(req.body.name.length < 32) {
        return next();
    }
    res.status(400);
    res.send('Task description too long!');    
}

module.exports = router;