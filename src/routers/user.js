const express = require('express')
const router = new express.Router()
const userController = require('../controllers/user')
const auth = require('../middleware/auth')

router.post('/users', userController.create)
router.post('/users/login', userController.login)
router.post('/users/logout', auth, userController.logout)
router.patch('/users/:id', auth, userController.update)
router.get('/users/me', auth, userController.read)
router.delete('/users/me', auth, userController.delete)

module.exports = router
