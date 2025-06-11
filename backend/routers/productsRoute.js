const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/products", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        products.id AS product_id,
        products.name,
        products.sku,
        products.category_id,
        products.unit,
        products.price,
        products.cost_price,
        products.stock,
        products.created_at,
        categories.id AS category_id,
        categories.name AS category_name
      FROM products 
      INNER JOIN categories ON categories.id = products.category_id ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/products", async (req, res) => {
  try {
    console.log("Body received:", req.body);
    const { name, sku, category_id, unit, price, cost_price, stock } = req.body;
    if (
      !name ||
      !sku ||
      !category_id ||
      !unit ||
      !price ||
      !cost_price ||
      !stock
    ) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    const sql =
      "INSERT INTO products (name,sku, category_id, unit, price, cost_price, stock) VALUES (?,?,?,?,?,?,?)";
    await db.execute(sql, [
      name,
      sku,
      category_id,
      unit,
      price,
      cost_price,
      stock,
    ]);
    res.status(201).json({ message: "Product Successfully Saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
