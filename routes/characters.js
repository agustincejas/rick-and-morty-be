var express = require('express');
const { getAllCharacters, getCharacter } = require('../controllers/characters');
var router = express.Router();
const { securedUser } = require('../middleware/auth');


/**
  * @openapi
  * '/api/characters':
  *  get:
  *     tags:
  *     - Characters
  *     summary: Get all characters
  *     security:
  *       - BearerAuth: []
  *     responses:
  *       200:
  *         description: Success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schemas/Characters'
*/
router.get('/', securedUser, getAllCharacters);

/**
  * @openapi
  * '/api/characters/{characterId}':
  *  get:
  *     tags:
  *     - Character
  *     summary: Get a single character using its id
  *     security:
  *       - BearerAuth: []
  *     parameters:
  *      - name: characterId
  *        in: path
  *        description: Character id
  *        required: true
  *     responses:
  *       200:
  *         description: Success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schemas/Character'
  *       404:
  *         message: Character not found
*/
router.get('/:id', securedUser, getCharacter);

module.exports = router;
