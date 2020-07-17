const Article = require("../models/article");

module.exports = {
  create: async (req, res) => {
    const article = await new Article({
      title: req.body.title,
      body: req.body.body,
    });
    try {
      if (!article) {
        return res.status(400).send();
      }
      article.save();
      res.status(201).send(article);
    } catch (e) {
      res.status(400).send();
    }
  },
  update: async (req, res) => {
    const article = await Article.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        body: req.body.body,
      }
    );
    try {
      if (!article) {
        return res.status(404).send();
      }
      article.save();
      res.json(article);
    } catch (e) {
      res.json({ success: false, result: err });
    }
  },
  read: async (req, res) => {
    const article = await Article.findById({ _id: req.params.id });
    try {
      if (!article) {
        return res.status(404).send();
      }
      res.send(article);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  readAll: async (req, res) => {
    const articles = await Article.find({});
    try {
      if (!articles) {
        res.status(404).send();
      }
      res.send(articles);
    } catch (e) {
      res.status(404).send(e);
    }
  },
  delete: async (req, res) => {
    const article = await Article.findByIdAndDelete({ _id: req.params.id });
    try {
      if (!article) {
        return res.status(404).send();
      }
      article.save();
      res.send(article);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
