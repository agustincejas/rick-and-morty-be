var express = require('express');
var router = express.Router();
const { createUser, login } = require('../controllers/auth');


/**
  * @openapi
  * '/api/auth':
  *  post:
  *    tags:
  *     - Register
  *    summary: Create user
  *    requestBody:
  *     required: true
  *     content:
  *       application/json:
  *         schema:
  *           $ref: '#/components/schemas/CreateUserInput'
  *    responses:
  *      201:
  *       description: Created
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UserSchema'
  *      400:
  *       description: Bad request
  *
  *
*/
router.post('/', createUser);

/**
  * @openapi
  * '/api/auth/login':
  *  post:
  *    tags:
  *     - Login
  *    summary: Login user
  *    requestBody:
  *     required: true
  *     content:
  *       application/json:
  *         schema:
  *           $ref: '#/components/schemas/CreateUserInput'
  *    responses:
  *      201:
  *       description: Created
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/LoggedUser'
  *      401:
  *       description: Bad credentials
  *
  *
*/
router.post('/login', login);

module.exports = router;
