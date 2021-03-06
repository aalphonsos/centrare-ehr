const { Router } = require('express');

const UserController = require('./controllers/UserController');

const routes = Router();

routes.post('/user', UserController.create);
routes.get('/login', UserController.login);

module.exports = routes;
