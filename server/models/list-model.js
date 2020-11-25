const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId, // tells server the field will be a object ID
    required: true,
    ref: 'User',
  }
},{
  timestamps: true, // timestamps is always set as a second arg
})

const List = mongoose.model('List', listSchema)

module.exports = List