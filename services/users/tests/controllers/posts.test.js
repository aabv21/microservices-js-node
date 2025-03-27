import { jest } from "@jest/globals";

describe("Test API v1 posts as a guest user", () => {
  const url = "http://localhost:3000/api/v1/posts";

  it("should return all posts", async () => {
    const response = await fetch(`${url}`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(response.data).not.toBeNull();
    expect(response.data.length).not.toBeUndefined();
    expect(response.data.length).toBeGreaterThan(0);

    data.forEach((post) => {
      expect(typeof post.title).toBe("string");
      expect(typeof post.content).toBe("string");
      expect(typeof post.slug).toBe("string");
      expect(typeof post.author.name).toBe("string");
      expect(Object.is(post.public, true)).toBe(true);
      expect(Array.isArray(post.comments)).toBe(true);
    });
  });

  test("should return 10 posts", async () => {
    const response = await fetch(`${url}?limit=10`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data.posts)).toBe(true);
    expect(data.posts).toHaveLength(10);
  });

  test("should return cached posts", async () => {
    const response = await fetch(`${url}?limit=10`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.cached).toBe(true);
  });
});
