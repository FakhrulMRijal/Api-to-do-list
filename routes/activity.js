const router = require('express').Router();
const Activity = require('../models/activity.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const activityController = require('../contollers/activity');

router.get('/', (req, res) => {
    Activity.find()
    .then(activity => res.json(activity))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/create', checkAuth, activityController.activity_create_all)

router.get('/', async (req, res) => {
    if(req.query.userId){
        if(req.query.userId.length !== 24){
            res.status(404).json({
                message : 'Invalid UserId'
            })
        }
        const user = await User.findById(req.query.userId)
        if(!user){
            res.status(404).json({
                message : 'User not found'
            })
        } else {
            // const activity = await Activity.find().where({
            //     userId : req.query.userId
            // })
            res.status(200).json({
                message : 'Success',
                status: 'Available',
                data : activity
            })
        }
    } else {
        res.status(404).json({
            message : 'Error'
        })
    }
})

module.exports = router