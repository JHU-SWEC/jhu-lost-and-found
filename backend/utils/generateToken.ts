import jwt from "jsonwebtoken";

const generateToken = (id: string, name: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default generateToken;
