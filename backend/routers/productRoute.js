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
INNER JOIN categories ON categories.id = products.category_id
WHERE products.deleted_at IS NULL
ORDER BY products.created_at DESC

    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/product", async (req, res) => {
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

router.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, category_id, unit, price, cost_price, stock } = req.body;
    console.log("Updating product:", { id, name, sku, category_id, unit, price, cost_price, stock });

    if (
      !id ||
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

    const [result] = await db.execute(
      `UPDATE products 
       SET name = ?, sku = ?, category_id = ?, unit = ?, price = ?, cost_price = ?, stock = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND deleted_at IS NULL`,
      [name, sku, category_id, unit, price, cost_price, stock, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product Not Found or Already Deleted" });
    }

    res.json({ message: "Product Successfully Updated" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.delete('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Soft Deleting ID:', id);

    if (!id) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const [result] = await db.execute(
      'UPDATE products SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
      [id]
    );
    console.log('Soft delete result:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product Not Found or Already Deleted' });
    }

    res.json({ message: 'Product Soft Deleted Successfully' });
  } catch (error) {
    console.error('Soft delete error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
