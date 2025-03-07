const { __email, __password } = globalThis;

describe("Test API v1 user creation ", () => {
  const url = "http://localhost:3000/api/v1/users";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    name: "Test Name",
    email: __email,
    password: __password,
  };

  test("should create a user", async () => {
    options.body = JSON.stringify(body);
    const response = await fetch(url, options);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.user.email).toBe(__email);
  });

  it("should not create a user with same email", async () => {
    body.email = __email;
    options.body = JSON.stringify(body);
    const response = await fetch(url, options);
    const data = await response.json();

    expect(response.status).toBe(500);
  });
});
