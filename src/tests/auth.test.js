import request from "supertest";
import mongoose from "mongoose";
// import app from "../app.js";
import app from "../app.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/SubLedgerPT2");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("POST /api/auth/signUp", () => {
  const fakeUserData = {
    name: `name-${Date.now()}`,
    email: `email-${Date.now()}@gmail.com`,
    password: "Password1",
    role: "user",
  };

  test("Inscription réussie", async () => {
    const response = await request(app)
      .post("/api/auth/signUp")
      .send(fakeUserData);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty(
      "message",
      "User created successfully.",
    );
  });
});
