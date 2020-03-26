const express = require('express');
const routes = express.Router();
const ongscontroller = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

routes.get('/sessions', sessionController.create);

routes.get('/ongs', ongscontroller.index);
routes.post('/ongs', ongscontroller.create);

routes.get('/profile', profileController.index);

routes.get('/incident', incidentController.index);
routes.post('/incident', incidentController.create);
routes.delete('/incident/:id', incidentController.delete);
module.exports = routes;