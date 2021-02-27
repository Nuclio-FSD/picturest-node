const request = require('supertest')
const { setupMongo } = require("./test.setup");
const { app } = require('../src/server');

// Setup a Test Database
setupMongo("users-testing");

test('Add a user should work', async() => {
    const res = await request(app)
        .post('/api/users')
        .send(
          {
            id: 1,
            firstName: "Cass",
            lastName: "Loughrey",
            email: "cloughrey0@mozilla.org",
            avatar: "https://robohash.org/consecteturnobisdolores.bmp?size=50x50&set=set1",
            password: "cloughrey0123",
            username: "johnDoe"
          }
        );
  
      expect(res.status).toBe(201);
  });
  
  test('Add a user should not work because the email is not valid', async() => {
    const res = await request(app)
        .post('/api/users')
        .send(
          {
            id: 1,
            firstName: "Cass",
            lastName: "Loughrey",
            email: "cloughrey0@mozilla",
            avatar: "https://robohash.org/consecteturnobisdolores.bmp?size=50x50&set=set1",
            password: "cloughrey0123",
            username: "johnDoe"
          }
        );
  
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toEqual("Invalid value");
      expect(res.body.errors[0].param).toEqual("email");
  });

  test('Add a user should not work because the password is not valid', async() => {
    const res = await request(app)
        .post('/api/users')
        .send(
          {
            id: 1,
            firstName: "Cass",
            lastName: "Loughrey",
            email: "cloughrey0@mozilla.org",
            avatar: "https://robohash.org/consecteturnobisdolores.bmp?size=50x50&set=set1",
            password: "1234",
            username: "johnDoe"
          }
        );
  
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toEqual("Invalid value");
      expect(res.body.errors[0].param).toEqual("password");
  });

test('Add a user should work', async() => {
    const creationRes = await request(app)
        .post('/api/users')
        .send(
            {
            id: 1,
            firstName: "Cass",
            lastName: "Loughrey",
            email: "cloughrey0@mozilla.org",
            avatar: "https://robohash.org/consecteturnobisdolores.bmp?size=50x50&set=set1",
            password: "cloughrey0123",
            username: "johnDoe"
            }
        );

    const getAllRes = await request(app)
        .get('/api/users');

    expect(creationRes.status).toBe(201);
    expect(getAllRes.status).toBe(200);
    expect(getAllRes.body.length).toEqual(1);
});