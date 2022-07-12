const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const app = require("../app");
const { User } = require("../models/usersModel");

const PORT = process.env.PORT || 3000;
const TEST_DB_HOST = process.env.TEST_DB_HOST;

describe("signup controller unit test", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(TEST_DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it("status 201, token and user object with email", async () => {
    const newUser = {
      name: "test",
      email: "test@mail.com",
      password: "123456",
    };

    const response = await request(app).post("/api/users/signup").send(newUser);
    const { body } = response;
    const { token, email } = await User.findOne({ email: newUser.email });

    expect(response.statusCode).toBe(201);
    expect(body.token).toBeDefined();
    expect(body.token).toBe(token);
    expect(body.user).toBeDefined();
    expect(body.user).toEqual(
      expect.objectContaining({
        email,
      })
    );
  });

  it("empty user, status 400, 'Bad request'", async () => {
    const newUser = {};

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("no password, status 400, 'Bad request'", async () => {
    const newUser = {
      email: "test@mail.com",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("no email, status 400, 'Bad request'", async () => {
    const newUser = {
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("extra field, status 400, 'Bad request'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "123456",
      extra: 123,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid email 123 , status 400, 'Bad request'", async () => {
    const newUser = {
      email: 123,
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid email false , status 400, 'Bad request'", async () => {
    const newUser = {
      email: false,
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid email {} , status 400, 'Bad request'", async () => {
    const newUser = {
      email: {},
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid email [] , status 400, 'Bad request'", async () => {
    const newUser = {
      email: [],
      password: "123456",
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid password 123456 , status 400, 'Bad request'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: 123456,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid password false , status 400, 'Bad request'", async () => {
    const newUser = {
      email: "test@mail.com",
      password: false,
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid password {} , status 400, 'Bad request", async () => {
    const newUser = {
      email: "test@mail.com",
      password: {},
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });

  it("invalid password [] , status 400, 'Bad request", async () => {
    const newUser = {
      email: "test@mail.com",
      password: [],
    };

    const response = await request(app).post("/api/users/login").send(newUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("Bad request");
  });
});
