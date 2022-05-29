const mongoose = require("mongoose");
const express = require("express");
const request = require("supertest");

const app = express();
app.use(express.json());
require("dotenv").config();

const router = require("../routes/auth");
app.use("/api", router);

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to database!");
});

describe("test routes ", () => {
test("register user", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
});

  test("login user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "test@test.com",
        password: "test",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
