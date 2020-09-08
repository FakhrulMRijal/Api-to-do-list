const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  _id: {
      type: mongoose.Schema.Types.ObjectId
  },
  userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  description: { 
      type: String
    },
  duration: { 
      type: Number
    },
  date: {
      type: String
  }
}, {
    timestamps : true
});

module.exports = mongoose.model('Activity', ActivitySchema)