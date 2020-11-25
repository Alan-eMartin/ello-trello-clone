const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true
  },
  listID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  }
},{
  timestamps: true
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card