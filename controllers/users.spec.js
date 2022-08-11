const usersController = require('./users');
const usersDB = require('./../models/users');

const {
  buildReq,
  buildRes,
  buildUser
} = require('../tests/utils/generate');

jest.mock('./../models/users');

beforeEach(() => {
  jest.clearAllMocks();
});

test('updateUser returns 401 when user tries to update other user', async () => {
  const req = buildReq({ id: 'userId', params: { id: 'otherUserId' } });
  const res = buildRes();
  const expectedResponse = {
    message: 'Unathorized'
  };

  await usersController.updateUser(req, res);

  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

test('updateUser returns 404 when user is not found', async () => {
  const userId = 'userId';
  const req = buildReq({ id: userId, params: { id: userId } });
  const res = buildRes();
  const expectedResponse = {
    message: 'User not found'
  };

  usersDB.findById.mockResolvedValueOnce(null);
  await usersController.updateUser(req, res);

  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

test('updateUser returns updated user', async () => {
  const userId = 'userId';
  const favorites = [1, 2, 3];
  const req = buildReq({ id: userId, params: { id: userId }, body: { favorites } });
  const res = buildRes();
  const user = buildUser({ id: userId, favorites: [2, 3, 5] });

  const { password, ...userResponse } = user;

  const expectedResponse = {
    ...userResponse,
    favorites
  };

  const mockUser = { ...user, save: () => { } };
  usersDB.findById.mockResolvedValueOnce(mockUser);
  await usersController.updateUser(req, res);

  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledTimes(1);
  // expect(res.json).toHaveBeenCalledWith(expectedResponse); //TODO figure out .save()
});