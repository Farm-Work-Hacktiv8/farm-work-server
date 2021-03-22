const router = require('express').Router()
const UserController = require('../controllers/user-controller')

router.get('/', (req, res) => {
    res.send('hai')
})
router.post('/register', UserController.register)

router.post('/login', UserController.login)

module.exports = router