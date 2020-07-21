const express = require('express')
const router = new express.Router()
const articleController = require('../controllers/article')
const auth = require('../middleware/auth')

router.post('/articles', auth, articleController.create)
router.patch('/articles/:id', auth, articleController.update)
router.get('/articles/:id', articleController.read)
router.get('/articles', articleController.readAll)
router.delete('/articles/:id', auth, articleController.delete)

module.exports = router
