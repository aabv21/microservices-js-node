import { jest } from "@jest/globals";

// Math test
test(" 2 + 2 expect to be 4", () => {
  expect(2 + 2).toBe(4);
});

// Math test
it(" 2 + 3 expect to be 5", () => {
  expect(2 + 3).toBe(5);
});

// Object test
test("Object should be equal", () => {
  const obj = { name: "John", age: 20 };
  expect(obj).toEqual({ name: "John", age: 20 });
});

// Array test
test("Checking array values (toContain, toHaveLength)", () => {
  const arr = [1, 2, 3, 4, 5];
  expect(arr).toContain(3);
  expect(arr).toHaveLength(5);
});

// String test
test("Checking string values (toContain, toHaveLength)", () => {
  const str = "Hello, world!";
  expect(str).toContain("world");
  expect(str).toHaveLength(13);
});

// Describe block
describe("Grouping math tests", () => {
  it("2 + 2 = 4", () => {
    expect(2 + 2).toBe(4);
  });

  test("2 + 3 = 5", () => {
    expect(2 + 3).toBe(5);
  });
});

// Async test
test("Async function returns correct value", async () => {
  async function fetchData() {
    return "data";
  }

  const result = await fetchData();
  expect(result).toBe("data");
});

// Mock test: if you have a function that you want to test but it's not ready yet, you can mock it
const mockFn = jest.fn().mockReturnValue("data");
test("Mock function returns correct value", () => {
  const result = mockFn();
  expect(result).toBe("data");
});
