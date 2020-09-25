const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Task = require('../models/task.js');

router.get('/', checkAutheneticated, (req, res) => {
    //res.redirect('./');
    res.render('index.ejs', {tasks: req.user.tasks});
});

// router.post('/addTask', checkAutheneticated, (req, res) => {
//     //res.render('index.ejs', {tasks: req.user.tasks});
//     res.send('bla bla');
// });

router.post('/addTask', validateTask, (req, res) => {
    User.findOne({email: req.user.email})
        .then(async user => {
            var task = new Task.model({name: req.body.name});
            user.tasks.addToSet(task);
            await user.save();

            //console.log(user.tasks.length);
            //User.aggregate([{$project: { count: { $size:"$tasks" }}}])

            //db.mycollection.aggregate([{$project: { count: { $size:"$foo" }}}])

            res.send({ task: task, length: user.tasks.length });
        }).catch(err => console.log(err));
});

// router.post('/deleteTask', (req, res) => {
//     //console.log('xd');
//     //User.findById(req.body.itemId).remove().exec();
//     //console.log(req.body.itemId);
//     User.findOne({email: req.user.email})
//         .then(async user => {
//             //console.log(user);
//             //await user.remove().exec();
//             user.tasks.pull(req.body.itemId);
//             await user.save();
//             res.redirect('./');
//             //res.render('index.ejs', {tasks: user.tasks});
//         })
// })

router.post('/deleteTask/:id', (req, res) => {
    //console.log('xd');
    //User.findById(req.body.itemId).remove().exec();
    //console.log(req.body.itemId);
    const id = req.params.id;

    User.findOne({email: req.user.email})
        .then(async user => {
            //console.log(user);
            //await user.remove().exec();
            user.tasks.pull(id);
            await user.save();
            res.send({ id: id, length: user.tasks.length });
            //res.render('index.ejs', {tasks: user.tasks});
        })
})

function checkAutheneticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function validateTask(req, res, next) {
    //$('#taskContainer').css("background-color", "green");

    if(req.body.name.length < 32) {
        return next();
    }
    res.status(400);
    res.send('None shall pass');
     
}

module.exports = router;