const { Schema, model } = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: email@example.com
 *        password:
 *          type: string
 *          default: asd123
 *    UserSchema:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        favorites:
 *          type: array
 *          items:
 *            type: number
 *        _id:
 *          type: string
 *        created_at:
 *          type: string
 *        updated_at:
 *          type: string
 *    UpdateUser:
 *      type: object
 *      properties:
 *        favorites:
 *          type: array
 *          items:
 *            type: number
 *    LoggedUser:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        favorites:
 *          type: array
 *          items:
 *            type: number
 *        id:
 *          type: string
 *        email:
 *          type: string
 *
 *
 */


const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: { type: String },
  favorites: {
    type: Array,
    default: []
  },
  enabled: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = model("user", UserSchema);
