import { jest } from "@jest/globals";

const { __email, __password } = globalThis;

describe("Test API v1 user auth", () => {
  const url = "http://localhost:3000/api/v1/auth";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  test("Should login and return token", async () => {
    options.body = JSON.stringify({
      email: __email,
      password: __password,
    });
    const response = await fetch(`${url}/login`, options);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.token).toContain(".eyJ");
  });

  test("Should not login with wrong password", async () => {
    options.body = JSON.stringify({
      email: __email,
      password: "wrong",
    });
    const response = await fetch(`${url}/login`, options);

    expect(response.status).toBe(401);
  });

  test("Should not login with wrong email", async () => {
    options.body = JSON.stringify({
      email: "wrong@wrong.com",
      password: __password,
    });
    const response = await fetch(`${url}/login`, options);

    expect(response.status).toBe(404);
  });
});
