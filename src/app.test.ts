import request from "supertest";
import { app } from "./app";

describe("GET /health", () => {
  it("responds with json", async () => {
    await request(app)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200, { healthy: true });
  });
});
