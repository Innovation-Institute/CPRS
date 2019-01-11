var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');


/* GET users listing. */
router.get('/login', AuthController.signup);
router.post('/login', AuthController.signin);
router.post('/add', AuthController.addUser);
router.get('/add', AuthController.createAccount);

module.exports = router;
