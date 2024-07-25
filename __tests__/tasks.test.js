const mongoose = require("mongoose");
const request = require("supertest");
const {
  app,
  connectDB,
  closeDB,
  startServer,
  stopServer,
} = require("../server");

let createdTaskId;

beforeAll(async () => {
  await connectDB();
  await startServer();
});

afterAll(async () => {
  await stopServer();
  await closeDB();
});

describe("Tasks API", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "This is a test task",
      status: "To Do",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    createdTaskId = res.body._id;
  });

  it("should not create a task without a title", async () => {
    const res = await request(app).post("/api/tasks").send({
      description: "This is a test task",
      status: "To Do",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("Title is required");
  });

  it("should get all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a specific task", async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", createdTaskId);
  });

  it("should update a task", async () => {
    const res = await request(app).put(`/api/tasks/${createdTaskId}`).send({
      title: "Updated Test Task",
      status: "In Progress",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Test Task");
    expect(res.body).toHaveProperty("status", "In Progress");
  });

  it("should not update a task with invalid status", async () => {
    const res = await request(app).put(`/api/tasks/${createdTaskId}`).send({
      status: "Invalid Status",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toContain("is not a valid status");
  });

  it("should delete a task", async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task deleted");
  });

  it("should return 404 for non-existent task", async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toEqual(404);
    // Adjust this expectation based on your actual API response
    expect(res.body).toEqual({
      message: "Task not found",
    });
  });

  it("should handle invalid ObjectId", async () => {
    const res = await request(app).get(`/api/tasks/invalidid`);
    expect(res.statusCode).toEqual(400);
    // Adjust this expectation based on your actual API response
    expect(res.body).toEqual({
      message: "Invalid task ID",
    });
  });
});
