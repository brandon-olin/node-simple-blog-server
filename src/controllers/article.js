const Article = require('../models/article')

module.exports = {
  create: async (req, res) => {
    const article = new Article({
      ...req.body,
      owner: req.user._id
    })
    try {
      await article.save()
      res.status(201).send(article)
    } catch (e) {
      res.status(400).send()
    }
  },
  update: async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'body']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate) {
      return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
      const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      })
      if (!article) {
        return res.status(404).send()
      }
      updates.forEach((update) => (article[update] = req.body[update]))
      await article.save()
      res.send(article)
    } catch (e) {
      console.log(e)
      res.status(400).send(e)
    }
  },
  read: async (req, res) => {
    const article = await Article.findById({ _id: req.params.id })
    try {
      if (!article) {
        return res.status(404).send()
      }
      res.send(article)
    } catch (e) {
      res.status(400).send(e)
    }
  },
  readAll: async (req, res) => {
    const articles = await Article.find({})
    try {
      if (!articles) {
        res.status(404).send()
      }
      res.send(articles)
    } catch (e) {
      res.status(404).send(e)
    }
  },
  delete: async (req, res) => {
    try {
      const article = await Article.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
      if (!article) {
        return res.status(404).send()
      }
      res.send(article)
    } catch (e) {
      res.status(500).send()
    }
  }
}
