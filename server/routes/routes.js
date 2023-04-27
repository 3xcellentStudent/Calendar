const Router = require('express').Router
const {body} = require('express-validator')
const userController = require('../controllers/user-controller')
const remindController = require('../controllers/remind-controller')

const router = new Router()

router.post('/registration', 
body('email').isEmail(), 
body('password').isLength({min: 8, max: 32}), 
userController.registration)

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/reset-password', userController.resetPass)
router.post('/recover-password', userController.recoveryPass)

router.post('/remind-create', remindController.createRemindController)
router.post('/remind-update', remindController.updateRemindController)
router.post('/remind-delete', remindController.deleteRemindController)
router.post('/reminds', remindController.postRemindsController)

router.get('/activate/:link', userController.activate)

module.exports = router