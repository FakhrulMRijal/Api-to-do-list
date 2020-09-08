const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true,
        minlength : 5
    },
    token : {
        type : String
    }
}, {
    timestamps : true
});

module.exports =  mongoose.model('User', UserSchema)