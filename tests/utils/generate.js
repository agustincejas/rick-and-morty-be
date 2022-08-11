const { faker } = require('@faker-js/faker');

const getPassword = (...args) => `!0_Oo${faker.internet.password(...args)}`;
const getEmail = () => faker.internet.email();
const getId = () => faker.random.uuid;

const buildUser = (overrides) => {
  return {
    id: getId(),
    email: getEmail(),
    password: getPassword(),
    ...overrides,
  };
};

const buildAuthFormPayload = (overrides) => {
  return {
    email: getEmail(),
    password: getPassword(),
    ...overrides
  };
};

const buildReq = (overrides) => {
  const req = { body: {}, params: {}, ...overrides };
  return req;
};

const buildRes = (overrides = {}) => {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  };
  return res;
};

const buildNext = (impl) => {
  return jest.fn(impl).mockName('next');
};

module.exports = {
  buildReq,
  buildRes,
  buildNext,
  buildUser,
  getPassword,
  getEmail,
  getId,
  buildAuthFormPayload
};
