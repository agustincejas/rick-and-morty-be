const authController = require('./auth');
const bcryptUtils = require('../utils/bcrypt');
const tokenUtils = require('../utils/token');
const usersDB = require('../models/users');

const {
  buildUser,
  buildReq,
  buildRes,
  buildAuthFormPayload,
  getId
} = require('../tests/utils/generate');

jest.mock('../utils/bcrypt');
jest.mock('../utils/token');
jest.mock('../models/users');


beforeEach(() => {
  jest.clearAllMocks();
});

test('createUser generates new user', async () => {
  const password = 'asd1234';
  const user = buildUser({ password });
  const res = buildRes();
  const req = buildReq({ body: user });
  const hashedPassword = password + 'hashed';
  const expectedUserToSave = { email: user.email, password: hashedPassword };
  const expectedResponse = {

  };

  bcryptUtils.hash.mockResolvedValueOnce(hashedPassword);
  usersDB.findOne.mockResolvedValueOnce(null);

  await authController.createUser(req, res);

  expect(usersDB.create).toHaveBeenCalledTimes(1);
  expect(usersDB.create).toHaveBeenCalledWith(expectedUserToSave);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledTimes(1);
  // expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

test('createUser throws error when existing user', async () => {
  const password = 'asd1234';
  const user = buildUser({ password });
  const res = buildRes();
  const req = buildReq({ body: user });
  const hashedPassword = password + 'hashed';
  const expectedResponse = {
    message: 'Email already in use'
  };

  bcryptUtils.hash.mockResolvedValueOnce(hashedPassword);
  usersDB.findOne.mockResolvedValueOnce(user);

  await authController.createUser(req, res);

  expect(usersDB.create).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});


test('login succes', async () => {
  const password = 'asd1234';
  const user = buildAuthFormPayload({ _id: 'userId', password });
  const res = buildRes();
  const req = buildReq({ body: user });
  const token = 'token';
  const favorites = [1, 2, 3];
  const existingUser = {
    ...user,
    favorites
  };

  const expectedResponse = {
    favorites,
    token: `Bearer ${token}`,
    email: user.email,
    id: user._id
  };

  usersDB.findOne.mockResolvedValueOnce(existingUser);
  bcryptUtils.compare.mockResolvedValueOnce(true);
  tokenUtils.generateJWT.mockImplementation((payload) => token); //Was mocking as async function for some reason

  await authController.login(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});



test('login throws error when wrong password', async () => {
  const password = 'asd1234';
  const user = buildAuthFormPayload({ password });
  const res = buildRes();
  const req = buildReq({ body: user });
  const expectedResponse = {
    message: 'Invalid password'
  };

  usersDB.findOne.mockResolvedValueOnce(user);
  bcryptUtils.compare.mockResolvedValueOnce(false);

  await authController.login(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

test('login throws error when wrong email', async () => {
  const password = 'asd1234';
  const user = buildUser({ password });
  const res = buildRes();
  const req = buildReq({ body: user });
  const expectedResponse = {
    message: 'Invalid email'
  };

  usersDB.findOne.mockResolvedValueOnce(null);

  await authController.login(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});