const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

process.env.JWT_KEY = 'secret'

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/register', (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email){
        return res.status(404).json({ message : 'Please fill the form'})
    }

    if(req.body.username.length < 5){
        return res.status(404).json({ message : 'Username minimal 5 character'})
    }

    if(req.body.password.length < 5){
        return res.status(404).json({ message : 'Password minimal 5 character'})
    }

    User.findOne({ email : req.body.email })
    .then(user => {
        if(user){
            return res.status(400).json({ message : 'Username or Email already exist' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                  return res.status(201).json({error : err})
                } else {
                //   console.log('NewUser===', newUser)
                  const user = new User ({
                    _id : new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                  });
                //   console.log('NewUser', newUser)
                  user.save()
                  .then(result => {
                    return res.status(200).json({ message: 'User created'})
                  })
                  .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                      error : err
                    })
                  })
                }
              }) 
        }

    })
})


router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "User not found"
        });
      }

      bcrypt.compare(req.body.password, user.password, function(err, result) {
          // console.log('True')
          if(user.password !== req.body.password){
            console.log("Error")
            return res.status(404).json({
              message : "Password not match"
            })
          }
          
          if(user.password === req.body.password){
            console.log('Masulk')
            const token = jwt.sign({
              email: user.email,
              userId: user._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "30 days"
            })
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
          }
          res.status(401).json({
            message : "Auth Failed"
          })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router