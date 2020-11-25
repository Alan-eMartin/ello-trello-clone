const express = require('express')
const List = require('../models/list-model')
const router = express.Router()
const auth = require('../middleware/auth')

// create list
router.post('/lists', auth, async (req, res) => {
  const list = new List({
    ...req.body,
    owner: req.user._id
  })

  try {
    await list.save()
    res.status(201).send(list)
  } catch (err) {
    res.status(500).send()
  }
})

// Get/Sort Lists
router.get('/lists', auth, async (req, res) => {
  const sort = {}

  if (req.query.sort) {
    const parts = req.query.sort.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user.populate({
      path:'lists',
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.lists)
  } catch (err) {
    res.status(404).send()
  }
})


module.exports = router