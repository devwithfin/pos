const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/transactions/history", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT t.id, p.name, t.quantity, t.type, t.created_by, u.username 
      FROM inventory_transactions t 
      INNER JOIN products p ON p.id = t.product_id 
      LEFT JOIN users u ON u.id = t.created_by ORDER BY id DESC;
      `
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/transactions/purchase", async (req, res) => {
  const { supplier_id, status, created_by, items } = req.body;

  if (!supplier_id || !status || !created_by || !items?.length) {
    return res.status(400).json({ message: "Incomplete Data" });
  }

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    const total = items.reduce((sum, item) => {
      return sum + parseFloat(item.total_price || 0);
    }, 0);

    const [purchaseResult] = await conn.query(
      `INSERT INTO purchases (supplier_id, total, status, created_by)
       VALUES (?, ?, ?, ?)`,
      [supplier_id, total, status, created_by]
    );

    const purchase_id = purchaseResult.insertId;

    const itemValues = items.map((item) => [
      purchase_id,
      item.product_id,
      item.quantity,
      item.unit_price,
    ]);

    await conn.query(
      `INSERT INTO purchase_items (purchase_id, product_id, quantity, unit_price)
       VALUES ?`,
      [itemValues]
    );

    await conn.commit();
    conn.release();

    res.status(200).json({ message: "Purchase Saved Successfully" });
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error(error);
    res.status(500).json({ message: "Failed to Save Purchase" });
  }
});

router.post("/transactions/sale", async (req, res) => {
  const { customer_id, status, created_by, items } = req.body;
  console.log("created_by:", created_by);

  if (!customer_id || !status || !created_by || !items?.length) {
    return res.status(400).json({ message: "Incomplete Data" });
  }

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    const total = items.reduce((sum, item) => {
      return sum + parseFloat(item.total_price || 0);
    }, 0);

    const [saleResult] = await conn.query(
      `INSERT INTO sales (customer_id, total, status, created_by)
       VALUES (?, ?, ?, ?)`,
      [customer_id, total, status, created_by]
    );

    const sale_id = saleResult.insertId;

    const itemValues = items.map((item) => [
      sale_id,
      item.product_id,
      item.quantity,
      item.unit_price,
    ]);

    await conn.query(
      `INSERT INTO sale_items (sale_id, product_id, quantity, unit_price)
       VALUES ?`,
      [itemValues]
    );

    await conn.commit();
    conn.release();

    res.status(200).json({ message: "Sale Saved Successfully" });
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error(error);
    res.status(500).json({ message: "Failed to Save Sale" });
  }
});

router.get("/transactions/summary", async (req, res) => {
  try {
    const [totalPurchases] = await db.execute(`
      SELECT SUM(total) AS total_purchases FROM purchases WHERE status = "received"
    `);

    const [transactionToday] = await db.execute(`
      SELECT COUNT(*) AS total_transaction_today FROM iNventory_transactions
      WHERE DATE(created_at) = CURDATE()
    `);

    const [totalSales] = await db.execute(`
      SELECT SUM(total) AS total_sales FROM sales WHERE status = "paid"
    `);

    const [totalUser] = await db.execute(`
      SELECT COUNT(*) AS total_user FROM users
    `);

    res.json({
      totalPurchases: totalPurchases[0].total_purchases || 0,
      transactionToday: transactionToday[0].total_transaction_today || 0,
      totalSales: totalSales[0].total_sales || 0,
      totalUser: totalUser[0].total_user || 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/purchases/week", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT DATE(created_at) as created_at, SUM(total) as total
      FROM purchases
      WHERE created_at >= CURDATE() - INTERVAL 6 DAY
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/sales/week", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT DATE(created_at) as created_at, SUM(total) as total
      FROM sales
      WHERE created_at >= CURDATE() - INTERVAL 6 DAY
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
