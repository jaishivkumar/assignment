const express = require('express');
const router = express.Router();
const UserController = require('../controller/usercontroller');
const { authenticateToken } = require('../middleware/token');
const gridController = require('../controller/gridController');
//register
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/state', authenticateToken, gridController.getGridState);
router.post('/update', authenticateToken, gridController.updateGridState);

module.exports = router;