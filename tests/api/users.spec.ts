import { apiTest as test, expect } from "@fixtures/api.fixture";

test.describe("JSONPlaceholder API", () => {
  // @sanity — core read + create
  test("GET /users - should return list of users", { tag: "@sanity" }, async ({ userApi }) => {
    const { status, data } = await userApi.getUsers();
    expect(status).toBe(200);
    expect(data.length).toBe(10);
    expect(data[0]).toHaveProperty("name");
    expect(data[0]).toHaveProperty("email");
    expect(data[0]).toHaveProperty("username");
  });

  test("POST /posts - should create a new post", { tag: "@sanity" }, async ({ userApi }) => {
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

  // @regression — extended read + update coverage
  test("GET /users/:id - should return a single user", { tag: "@regression" }, async ({ userApi }) => {
    const { status, data } = await userApi.getUserById(1);
    expect(status).toBe(200);
    expect(data.id).toBe(1);
    expect(data.name).toBe("Leanne Graham");
    expect(data.email).toBeTruthy();
    expect(data.address).toHaveProperty("city");
    expect(data.company).toHaveProperty("name");
  });

  test("GET /posts - should return list of posts", { tag: "@regression" }, async ({ userApi }) => {
    const { status, data } = await userApi.getPosts();
    expect(status).toBe(200);
    expect(data.length).toBe(100);
    expect(data[0]).toHaveProperty("userId");
    expect(data[0]).toHaveProperty("title");
    expect(data[0]).toHaveProperty("body");
  });

  test("GET /posts?userId=1 - should filter posts by user", { tag: "@regression" }, async ({
    userApi,
  }) => {
    const { status, data } = await userApi.getPostsByUserId(1);
    expect(status).toBe(200);
    expect(data.length).toBeGreaterThan(0);
    for (const post of data) {
      expect(post.userId).toBe(1);
    }
  });

  test("PUT /posts/:id - should update a post", { tag: "@regression" }, async ({ userApi }) => {
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

  // @mock — mutation / destructive operations
  test("PATCH /posts/:id - should partially update a post", { tag: "@mock" }, async ({
    userApi,
  }) => {
    const { status, data } = await userApi.patchPost(1, {
      title: "Patched Title",
    });
    expect(status).toBe(200);
    expect(data.title).toBe("Patched Title");
    expect(data.body).toBeTruthy(); // unchanged fields preserved
  });

  test("DELETE /posts/:id - should delete a post", { tag: "@mock" }, async ({ userApi }) => {
    const { status } = await userApi.deletePost(1);
    expect(status).toBe(200);
  });
});
