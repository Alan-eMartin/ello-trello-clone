const express = require('express')
const User = require('../models/user-model')
const router = express.Router()
const auth = require('../middleware/auth')

// create user / signup
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

// Login User
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user: user, token })
  } catch (err) {
    res.status(400).send()
  }
})

// Logout Single Session
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

// Logout of ALL Sessions
router.post('/users/logoutALL', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()
  } catch (err) {
    res.status(500).send()
  }
})

// fetch User Login Info
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// Update User
router.patch('/users/me', auth, async (req, res) => {
  // code below checks that the updates the user is making are one of the following name, email, pw, or age if not it will return an error
  const updates = Object.keys(req.body)
  const allowedUpdates = ["name", "email", "password", "age"]
  const isValidOperation = updates.every(update => {
    // return all true
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()

    if (!req.user) {
      return res.status(404).send()
    }

    res.send(req.user)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Delete User
router.delete('/users/me', auth, async (req, res) => {

  try {
    await req.user.remove()
    res.send(req.user)
  } catch (err) {
    res.status(500).send()
  }
})

module.exports = router