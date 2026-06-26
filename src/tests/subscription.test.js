import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/SubLedgerPT2");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("GET /api/subscriptions", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTNlNWExNWZhMTgwMzQxNzExN2RkNzUiLCJyb2xlIjoidXNlciIsImlhdCI6MTc4MjQ5MDY3NiwiZXhwIjoxNzgzMDk1NDc2fQ.Udr8S1TFScC_BoGMTQ0Ise2ZZ96uSvn7DzWHE97E-bI";
  test("GET Subscriptions ", async () => {
    const response = await request(app)
      .get("/api/subscriptions")
      .set("Authorization", `Bearer ${token}`);

    // Code HTTP
    expect(response.statusCode).toBe(200);

    // Structure de la réponse
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /api/subscriptions/create", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTNlNWExNWZhMTgwMzQxNzExN2RkNzUiLCJyb2xlIjoidXNlciIsImlhdCI6MTc4MjQ5MDY3NiwiZXhwIjoxNzgzMDk1NDc2fQ.Udr8S1TFScC_BoGMTQ0Ise2ZZ96uSvn7DzWHE97E-bI"
  const fakeSubscriptionData = {
    name: `sub-${Date.now()}`,
    price: 99.99,
    billingCycle: "monthly",
  };

  test("should create a subscription", async () => {
    const response = await request(app)
      .post("/api/subscriptions/create")
      .set("Authorization", `Bearer ${token}`)
      .send(fakeSubscriptionData);

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty(
      "message",
      "Subscription created successfully.",
    );

    expect(response.body).toHaveProperty("newSubscription");

    expect(response.body.newSubscription).toHaveProperty(
      "name",
      fakeSubscriptionData.name,
    );

    expect(response.body.newSubscription).toHaveProperty(
      "price",
      fakeSubscriptionData.price,
    );

    expect(response.body.newSubscription).toHaveProperty(
      "billingCycle",
      fakeSubscriptionData.billingCycle,
    );
  });
});
