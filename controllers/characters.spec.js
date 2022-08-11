const charactersController = require('./characters');
const axios = require('axios');

const {
  buildReq,
  buildRes
} = require('../tests/utils/generate');

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();
});

test('getAllCharacters returns all characters', async () => {
  const res = buildRes();
  const req = buildReq();
  const apiResponse = {
    data:
    {
      info: {
        count: 826,
        pages: 2,
        next: "https://rickandmortyapi.com/api/character?page=2",
        prev: null
      },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "Earth (C-137)",
            url: "https://rickandmortyapi.com/api/location/1"
          },
          location: {
            name: "Citadel of Ricks",
            url: "https://rickandmortyapi.com/api/location/3"
          },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          episode: [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            "https://rickandmortyapi.com/api/episode/4",
            "https://rickandmortyapi.com/api/episode/5",
            "https://rickandmortyapi.com/api/episode/6",
            "https://rickandmortyapi.com/api/episode/7",
          ],
          url: "https://rickandmortyapi.com/api/character/1",
          created: "2017-11-04T18:48:46.250Z"
        },
        {
          id: 2,
          name: "Morty Smith",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "unknown",
            url: ""
          },
          location: {
            name: "Citadel of Ricks",
            url: "https://rickandmortyapi.com/api/location/3"
          },
          image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          episode: [
            "https://rickandmortyapi.com/api/episode/1",
            "https://rickandmortyapi.com/api/episode/2",
            "https://rickandmortyapi.com/api/episode/3",
            "https://rickandmortyapi.com/api/episode/4",
            "https://rickandmortyapi.com/api/episode/5"
          ],
          url: "https://rickandmortyapi.com/api/character/2",
          created: "2017 - 11 - 04T18: 50: 21.651Z"
        }
      ]
    }
  };


  axios.get.mockResolvedValueOnce(apiResponse);
  await charactersController.getAllCharacters(req, res);

  expect(axios.get).toHaveBeenCalledWith(process.env.RICK_AND_MORTY_API);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(apiResponse.data);
});


test('getAllCharacter returns all characters', async () => {
  const res = buildRes();
  const params = { params: { id: 1 } };
  const req = buildReq(params);
  const apiResponse = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1"
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3"
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      "https://rickandmortyapi.com/api/episode/4",
      "https://rickandmortyapi.com/api/episode/5",
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z"
  };

  axios.get.mockResolvedValueOnce(apiResponse);
  await charactersController.getCharacter(req, res);

  expect(axios.get).toHaveBeenCalledWith(`${process.env.RICK_AND_MORTY_API}/${params.params.id}`);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith(apiResponse.data);
});