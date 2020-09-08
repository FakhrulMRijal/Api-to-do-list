const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5900;

app.use(cors());
app.use(express.json());
app.use(session({secret : 'mysupersecret', resave: false, saveUninitialized: false}))


const db = require('./config/keys').mongoURI

mongoose.connect(db,{ useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB is success'))
    .catch(err => console.log(err))

const usersRouter = require('./routes/users')
const activityRouter = require('./routes/activity')

app.use('/users', usersRouter)
app.use('/activity', activityRouter)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
