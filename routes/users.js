const express = require('express');
const router = express.Router();
const Auth = require('../controllers/AuthController');
const App = require('../controllers/AppController');

const AppController=new App();
const AuthController=new Auth();

/* GET users listing. */
router.get('/login', AuthController.signup);
router.post('/login', AuthController.signin,AppController.dashboard);
router.post('/add', AuthController.addUser);
router.get('/add', AuthController.createAccount);

module.exports = router;
