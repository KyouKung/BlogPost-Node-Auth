import { Router } from "express";
import { pool } from "../utils/db.js";
// import { protect } from "../middlewares/protect.js";

const shopRouter = Router();

// shopRouter.use(protect);

shopRouter.get("/", async (req, res) => {
  const tableName = "shops";

  try {
    const query = `SELECT * FROM ${tableName}`;
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      return res.json({
        shops: result.rows,
      });
    } else {
      return res.json({
        message: "No shops found",
      });
    }
  } catch (err) {
    console.error("Error during PostgreSQL selection:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

shopRouter.get("/:id", async (req, res) => {
  const tableName = "shops";
  const shopId = req.params.id;

  try {
    const query = `SELECT * FROM ${tableName} WHERE shop_id = $1`;
    const result = await pool.query(query, [shopId]);

    if (result.rows.length > 0) {
      return res.json({
        shop: result.rows[0],
      });
    } else {
      return res.status(404).json({
        message: "Shop not found",
      });
    }
  } catch (err) {
    console.error("Error during PostgreSQL selection:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

shopRouter.post("/", async (req, res) => {
  const shop = {
    title: req.body.title,
    content: req.body.content,
    lat: req.body.lat,
    lng: req.body.lng,
  };

  const tableName = "shops";

  try {
    const query = `INSERT INTO ${tableName} (title, content, lat, lng) VALUES ($1, $2, $3, $4)`;
    const values = [shop.title, shop.content, shop.lat, shop.lng];

    await pool.query(query, values);

    return res.json({
      message: "Shop has been created successfully",
    });
  } catch (err) {
    console.error("Error during PostgreSQL insertion:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

shopRouter.put("/:id", async (req, res) => {
  const tableName = "shops";
  const shopId = req.params.id;

  const updatedShop = {
    title: req.body.title,
    content: req.body.content,
    lat: req.body.lat,
    lng: req.body.lng,
  };

  try {
    const query = `
      UPDATE ${tableName}
      SET title = $1, content = $2, lat = $3, lng = $4
      WHERE shop_id = $5
      RETURNING *
    `;
    const values = [
      updatedShop.title,
      updatedShop.content,
      updatedShop.lat,
      updatedShop.lng,
      shopId,
    ];

    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      return res.json({
        message: "Shop updated successfully",
      });
    } else {
      return res.status(404).json({
        message: "Shop not found",
      });
    }
  } catch (err) {
    console.error("Error during PostgreSQL update:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

shopRouter.delete("/:id", async (req, res) => {
  const tableName = "shops";
  const shopId = req.params.id;

  try {
    const query = `DELETE FROM ${tableName} WHERE shop_id = $1`;
    const result = await pool.query(query, [shopId]);

    if (result.rowCount > 0) {
      return res.json({
        message: "Shop deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Shop not found",
      });
    }
  } catch (err) {
    console.error("Error during PostgreSQL deletion:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

export default shopRouter;
