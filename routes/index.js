const express = require('express');
const router = express.Router();
const App = require('../controllers/AppController');
const Auth = require('../controllers/AuthController');

const AppController=new App();
const AuthController=new Auth();

/** Get the dashboard */
router.get('/', AuthController.isAuthenticated, AppController.dashboard)

/** List Keys */
router.post('/list/:table', AuthController.isAuthenticated, AppController.listField);

/** Report Generator */
router.post('/filter/:table', AuthController.isAuthenticated, AppController.additionalColumns, AppController.filterField);

module.exports = router;