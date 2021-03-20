const request = require('supertest');
const { setupMongo } = require("./test.setup");
const { app } = require('../src/server');

// Setup a Test Database
setupMongo("healthcheck-testing");

test('Healthcheck should return OK', async () => {
    const res = await request(app).get('/healthcheck');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({message: 'OK'});
});

test('Healthcheck should return not found', async () => {
  const res = await request(app).get('/hc');

  expect(res.status).toBe(404);
});