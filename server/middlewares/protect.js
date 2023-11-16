import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      message: "Please send me a JWT token",
    });
  }

  if (!token.startsWith("Bearer ")) {
    return res.json({
      message: "JWT token is invalid",
    });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.json({
        message: "Token is invalid",
      });
    }
    req.user = payload;
    next();
  });
};
