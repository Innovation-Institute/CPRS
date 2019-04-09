const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/EventsController');
const Auth = require('../controllers/AuthController');
const AuthController=new Auth();
const Events=new EventsController();
/**
 * Index
 */
router.get('/', AuthController.isAuthenticated , Events.index);
/**
 * View
 */
router.get('/view/:id', AuthController.isAuthenticated , Events.view);
/**
 * Edit
 */
router.get('/edit/:id', AuthController.isAuthenticated , Events.edit);
router.post('/edit/:id', AuthController.isAuthenticated , Events.editPost, AuthController.isAuthenticated , Events.view);
/**
 * 
 * Create
 */

router.get('/add/', AuthController.isAuthenticated , Events.add);
router.post('/add/', AuthController.isAuthenticated , Events.addPost, AuthController.isAuthenticated , Events.view);

/**
 * Report
 */
router.get('/report', AuthController.isAuthenticated , Events.report);

/**
 * Fundings get,add,update(set) metadata
 */
router.get('/meta/view/:fieldName', AuthController.isAuthenticated , Events.getMetadata);
router.put('/meta/add', AuthController.isAuthenticated ,AuthController.isAdmin, Events.addMetadata);
router.get('/meta/update', AuthController.isAuthenticated ,AuthController.isAdmin, Events.setMetadata);
router.get('/meta/', AuthController.isAuthenticated ,AuthController.isAdmin, Events.indexMetadata);
router.delete('/meta/delete/:fieldName/:fieldValue', AuthController.isAuthenticated ,AuthController.isAdmin, Events.deleteMetadata);

module.exports = router;