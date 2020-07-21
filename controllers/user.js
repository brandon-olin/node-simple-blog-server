const User = require('../models/user')

module.exports = {
  create: async (req, res) => {
    const user = new User(req.body)
    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
    } catch (e) {
      res.status(400).send(e)
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      )
      const token = await user.generateAuthToken()
      res.send({ user, token })
    } catch (e) {
      console.log(e)
      res.status(400).send()
    }
  },
  logout: async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
      await req.user.save()
      res.send()
    } catch (e) {
      res.status(400).send()
    }
  },
  read: async (req, res) => {
    res.send(req.user)
  },
  update: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    try {
      if (!user) {
        return res.status(404).send('User with that ID could not be found!')
      }
      console.log(user)
      await user.save()
      console.log(user)
      res.send(user)
    } catch (e) {
      console.log(e)
      res.status(400).send(e)
    }
  },
  delete: async (req, res) => {
    try {
      await req.user.remove()
      res.send(req.user)
    } catch (e) {
      res.status(400).send(e)
    }
  }
}
