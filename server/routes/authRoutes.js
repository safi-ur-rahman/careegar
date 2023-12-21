const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getProfile } = require('../controllers/authControllers');

router.use(
    cors({
        credentials: true,
        origin: 'http://127.0.0.1:5173'
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

module.exports = router