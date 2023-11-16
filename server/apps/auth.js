import { Router } from "express";
import { pool } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const tableName = "users";

  try {
    const query = `INSERT INTO ${tableName} (username, password) VALUES ($1, $2)`;
    const values = [user.username, user.password];

    await pool.query(query, values);

    return res.json({
      message: "User has been created successfully",
    });
  } catch (err) {
    console.error("Error during PostgreSQL insertion:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    req.body.username,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const user = rows[0];

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Password not valid",
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: "900000",
    }
  );

  return res.json({
    message: "Login successfully",
    token,
  });
});

export default authRouter;
