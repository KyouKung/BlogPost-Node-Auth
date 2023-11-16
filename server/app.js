import express from "express";
import cors from "cors";
import authRouter from "./apps/auth.js";
import shopRouter from "./apps/shop.js";
import dotenv from "dotenv";

async function init() {
  dotenv.config();

  const app = express();
  const port = 4000;

  app.use(express.json());
  app.use(cors());
  app.use("/auth", authRouter);
  app.use("/shop", shopRouter);

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}

init();
