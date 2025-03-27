const data = {
  name: "John",
  age: 30,
  email: "sddad",
};

const userProxy = new Proxy(data, {
  get: function (target, key) {
    const value = target[key];
    console.log(`User property ${key} has been accessed`);
    return value;
  },
  set: function (target, key, value) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (key === "email" && !regexEmail.test(value)) {
      throw new Error("Email must be a valid email address");
    }
    target[key] = value;
    console.log(`User property ${key} has been set to ${value}`);
    return true;
  },
});

// console.log(userProxy.email);
// userProxy.email = "john@example.com";
// console.log(userProxy.email);
