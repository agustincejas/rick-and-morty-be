var express = require('express');
var router = express.Router();
const { updateUser } = require('../controllers/users');
const { securedUser } = require('../middleware/auth');

/**
  * @openapi
  * '/api/users/{userId}':
  *  put:
  *     tags:
  *     - User
  *     summary: Update an user
  *     security:
  *       - BearerAuth: []
  *     parameters:
  *      - name: userId
  *        in: path
  *        description: User id
  *        required: true
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateUser'
  *     responses:
  *       200:
  *         description: Success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schemas/UserSchema'
  *       404:
  *         message: User not found
*/
router.put('/:id', securedUser, updateUser);

module.exports = router;









