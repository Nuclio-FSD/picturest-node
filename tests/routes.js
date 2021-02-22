const request = require('supertest')
const { start } = require('../src/server');

describe("HealthCheck", () => {
    it("should get OK on the healthcheck", async () => {
      await request(start)
        .get("/healthcheck")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });