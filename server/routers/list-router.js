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

// get list by id
router.get('/lists/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const list = await List.findOne({ _id, owner: req.user._id })

    if (!list) {
      res.status(404).send()
    }
    res.send(list)
  } catch (err) {
    res.status(500).send()
  }
})

// Update Lists
router.patch('/lists/:id', auth, async (req, res) => {
  // check that the fields being changed are all, or one of the following
  const updates = Object.keys(req.body)
  const allowedUpdates = ["title", "position"]
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({ error: 'The field you are trying to update are invalid' })
  }

  try {
    const list = await List.findOne({ _id: req.params.id, owner: req.user._id })

    if (!list) {
      return res.status(404).send()
    }
    updates.forEach(update => list[update] = req.body[update])
    await list.save()
    res.send(list)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Delete List
router.delete('/lists/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    const list = await List.findOneAndDelete({ _id, owner: req.user._id })

    if (!list) {
      res.status(404).send()
    }
    res.send(list)
  } catch (err) {
    res.status(500).send()
  }
})



module.exports = router