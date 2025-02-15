import { randomBytes, pbkdf2Sync } from "node:crypto";

class PassCrypt {
  #password;
  #salt = randomBytes(32).toString("hex");
  #iterations = 10000;
  #keyLength = 64;
  #digest = "sha256";

  // constructor(password) {
  //   this.password = password;
  // }

  hashPassword(password) {
    const hashedPassword = pbkdf2Sync(
      password,
      this.#salt,
      this.#iterations,
      this.#keyLength,
      this.#digest
    ).toString("hex");

    this.#password = hashedPassword;
    return `${this.#salt}:${hashedPassword}`;
  }

  verifyPassword(password, DBpassword) {
    this.#salt = DBpassword.split(":")[0];
    const newHashedPassword = this.hashPassword(password);
    return newHashedPassword === DBpassword;
  }
}

const passCrypt = new PassCrypt();
passCrypt.hashPassword("123456");
export default passCrypt;
