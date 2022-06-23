import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const issueToken = (userId) => {
  const payload = {
    sub: userId,
  };

  const signOptions = {
    expiresIn: "2d", // * Token expires in two days
  };

  const jwt = jsonwebtoken.sign(
    payload,
    process.env.SECRET_OR_KEY,
    signOptions
  );
  return jwt;
};

export { issueToken };
