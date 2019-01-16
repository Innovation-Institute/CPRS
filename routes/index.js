const express = require('express');
const router = express.Router();
const App = require('../controllers/AppController');

const AppController=new App();

/** Get the dashboard */
router.get('/', AppController.dashboard)

/** List Keys */
router.post('/list/:table', AppController.listField);

/** Report Generator */
router.post('/filter/:table', AppController.filterField);

module.exports = router;