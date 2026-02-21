import { apiTest as test, expect } from "@fixtures/api.fixture";
import { epic, feature, story, severity, tags, allureId } from "allure-js-commons";

test.describe("JSONPlaceholder API", () => {
  test.beforeEach(async () => {
    await epic("API");
    await feature("Users & Posts API");
  });

  test("PROJ-501 | GET /users - should return list of users", async ({ userApi }) => {
    await allureId("PROJ-501");
    await story("GET /users - List All Users");
    await severity("critical");
    await tags("smoke", "regression");

    const { status, data } = await userApi.getUsers();
    expect(status).toBe(200);
    expect(data.length).toBe(10);
    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("email");
    expect(data[0]).toHaveProperty("username");
  });

  test("PROJ-502 | POST /posts - should create a new post", async ({ userApi }) => {
    await allureId("PROJ-502");
    await story("POST /posts - Create New Post");
    await severity("critical");
    await tags("smoke", "regression");

    const payload = {
      userId: 1,
      title: "Test Post",
      body: "Test body content",
    };
    const { status, data } = await userApi.createPost(payload);
    expect(status).toBe(201);
    expect(data.title).toBe(payload.title);
    expect(data.body).toBe(payload.body);
    expect(data.userId).toBe(payload.userId);
    expect(data.id).toBeTruthy();
  });

  test("PROJ-503 | GET /users/:id - should return a single user", async ({ userApi }) => {
    await allureId("PROJ-503");
    await story("GET /users/:id - Get Single User");
    await severity("normal");
    await tags("regression");

    const { status, data } = await userApi.getUserById(1);
    expect(status).toBe(200);
    expect(data.id).toBe(1);
    expect(data.name).toBe("Leanne Graham");
    expect(data.email).toBeTruthy();
    expect(data.address).toHaveProperty("city");
    expect(data.company).toHaveProperty("name");
  });

  test("PROJ-504 | GET /posts - should return list of posts", async ({ userApi }) => {
    await allureId("PROJ-504");
    await story("GET /posts - List All Posts");
    await severity("normal");
    await tags("regression");

    const { status, data } = await userApi.getPosts();
    expect(status).toBe(200);
    expect(data.length).toBe(100);
    expect(data[0]).toHaveProperty("userId");
    expect(data[0]).toHaveProperty("title");
    expect(data[0]).toHaveProperty("body");
  });

  test("PROJ-505 | GET /posts?userId=1 - should filter posts by user", async ({ userApi }) => {
    await allureId("PROJ-505");
    await story("GET /posts?userId - Filter Posts by User");
    await severity("normal");
    await tags("regression");

    const { status, data } = await userApi.getPostsByUserId(1);
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThan(0);
    for (const post of data) {
      expect(post.userId).toBe(1);
    }
  });

  test("PROJ-506 | PUT /posts/:id - should update a post", async ({ userApi }) => {
    await allureId("PROJ-506");
    await story("PUT /posts/:id - Full Update Post");
    await severity("normal");
    await tags("regression");

    const payload = {
      id: 1,
      userId: 1,
      title: "Updated Title",
      body: "Updated body",
    };
    const { status, data } = await userApi.updatePost(1, payload);
    expect(status).toBe(200);
    expect(data.title).toBe("Updated Title");
    expect(data.body).toBe("Updated body");
  });

  test("PROJ-507 | PATCH /posts/:id - should partially update a post", async ({ userApi }) => {
    await allureId("PROJ-507");
    await story("PATCH /posts/:id - Partial Update Post");
    await severity("minor");
    await tags("regression", "mock");

    const { status, data } = await userApi.patchPost(1, {
      title: "Patched Title",
    });
    expect(status).toBe(200);
    expect(data.title).toBe("Patched Title");
    expect(data.body).toBeTruthy();
  });

  test("PROJ-508 | DELETE /posts/:id - should delete a post", async ({ userApi }) => {
    await allureId("PROJ-508");
    await story("DELETE /posts/:id - Delete Post");
    await severity("minor");
    await tags("regression", "mock");

    const { status } = await userApi.deletePost(1);
    expect(status).toBe(200);
  });
});
