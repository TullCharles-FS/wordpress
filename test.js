const request = require("supertest");
const app = require("./index");

describe("GET /api/contacts", () => {
  it("should return all contacts", async () => {
    const response = await request(app).get("/api/contacts");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});

describe("POST /api/contacts", () => {
  it("should create a new user", async () => {
    const newUser = {
      fname: "john_doe",
      email: "john@example.com",
    };
    const response = await request(app).post("/api/contacts").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
  });
});

describe("PUT /api/users/:id", () => {
  it("should update an existing user", async () => {
    const updatedUser = {
      username: "updated_username",
    };
    const response = await request(app)
      .put("/api/contacts/1")
      .send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(updatedUser.username);
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete an existing user", async () => {
    const response = await request(app).delete("/api/contacts/1");
    expect(response.status).toBe(200);
  });
});
