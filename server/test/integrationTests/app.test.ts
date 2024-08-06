import request from "supertest";
import { app } from "../../src/app";

describe("GET /random-url", () => {
  it("should return 404", async () => {
    await request(app).get("/reset").expect(404);
  });
});

let correctDate: string;
describe("GET /exchange-rates/dates", () => {
  it("should return HTTP 200", async () => {
    const response = await request(app)
      .get("/api/exchange-rates/dates")
      .set("accept", "application/json")
      .expect(200);
    correctDate = response.body[0];
  });
});

describe("GET /exchange-rates/:date", () => {
  it("should return HTTP 200", async () => {
    await request(app)
      .get(`/api/exchange-rates/${correctDate}`)
      .set("accept", "application/json")
      .expect(200);
  });

  it("should return an error for an invalid date", async () => {
    const invalidDate = "2023-09-16";
    await request(app)
      .get(`/api/exchange-rates/${invalidDate}`)
      .set("accept", "application/json")
      .expect(400);
  });
});
