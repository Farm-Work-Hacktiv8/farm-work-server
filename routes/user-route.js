const router = require('express').Router()

router.post('/register', Controller)

router.post('/login', Controller)

module.exports = router