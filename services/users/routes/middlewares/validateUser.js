/**
 * @description Validate the user data
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 */
const validateUser = (req, res, next) => {
  try {
    const data = req.body;
    const validUser = new Proxy(data, {
      set: (target, key, value) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (key === "email" && !regexEmail.test(value)) {
          throw new Error("Email must be a valid email address");
        }
        target[key] = value;
        return true;
      },
    });

    Object.assign(data, validUser);
    req.body = validUser;

    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

export default validateUser;
