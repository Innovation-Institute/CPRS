const express = require('express');
const router = express.Router();
const Auth = require('../controllers/AuthController');
const App = require('../controllers/AppController');

const AppController=new App();
const AuthController=new Auth();

/* GET users listing. */
router.get('/login', AuthController.signup);
router.get('/logout',AuthController.isAuthenticated, AuthController.logout);
router.post('/login', AuthController.signin,AppController.dashboard);
router.post('/add',AuthController.isAuthenticated, AuthController.addUser);
router.get('/add', AuthController.isAuthenticated, AuthController.createAccount);

router.get('/forgot', AuthController.forgotAccount);
router.post('/forgot', AuthController.setNewPassword);
router.get('/reset/:token', AuthController.resetPassword);
router.post('/reset/:token', AuthController.resetPasswordPost);

router.get('/forbidden', AuthController.isAuthenticated, AuthController.isAuthorized);

module.exports = router;
