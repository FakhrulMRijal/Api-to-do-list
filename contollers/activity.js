const router = require('express').Router();
const Activity = require('../models/activity.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')


exports.activity_create_all = 
router.post('/create', checkAuth , (req, res) => {
    User.findById(req.body.userId)
        .then((userId) => {
            console.log('User==', req.body.userId)
            if (!userId) {
                res.status(404).json({ message : "User not found"})
            } else {
                res.status(200).json({
                    message : "Activity alredy in database",
                    userOrder : { userId : userId._id }
                })
            } 
        })

        if(req.body.description.length === 0){
            console.log('Error')
            return res.status(404).json({ message : "Just String"})
        }
        if(req.body.duration === 0){
            return res.status(404).json({ message : "Your duration still zero"})
        }
    Activity.findById(req.body.activityId)
        .then((activity) => {
            console.log('Masuk')
            if(!req.body){
                return res.status(400).json({ message : 'Must fill'})
            } 
            else {
                // console.log('Res==', activity)
                // const d = new Date()
                const activity = new Activity({
                    _id : mongoose.Types.ObjectId(),
                    userId : req.body.userId,
                    description : req.body.description,
                    duration : req.body.duration,
                    date : new Date(req.body.date)
                })
                return activity.save()
            }
        })
        .catch((e) => {
            res.status(400).json({
                message : "Activity Not Found"
            })
        })
})