const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/archived', async (req, res) => {
  try {
    const tables = ['categories', 'customers', 'suppliers', 'products', 'roles', 'users'];
    const typeMap = {
      categories: 'category',
      customers: 'customer',
      suppliers: 'supplier',
      products: 'product',
      roles: 'role',
      users: 'user',
    };

    const allDeleted = [];

    for (const table of tables) {
      const nameColumn = table === 'users' ? 'username' : 'name';

      const [rows] = await db.query(`
        SELECT id, ${nameColumn} AS name, deleted_at 
        FROM ${table} 
        WHERE deleted_at IS NOT NULL
      `);

      const formatted = rows.map((item) => ({
        id: item.id,
        name: item.name || 'Unnamed',
        type: typeMap[table],
        deleted_at: item.deleted_at,
      }));

      allDeleted.push(...formatted);
    }

    res.json(allDeleted);
  } catch (err) {
    console.error("Fetch archive error:", err);
    res.status(500).json({ error: 'Failed to fetch archive data' });
  }
});

router.put('/restore/:type/:id', async (req, res) => {
  const { type, id } = req.params;

  const validTypes = ['categories', 'products', 'suppliers', 'customers', 'roles', 'users'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: "Invalid type provided." });
  }

  try {
    const [result] = await db.execute(
      `UPDATE ${type} SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data not found or already restored." });
    }

    res.json({ message: "Data restored successfully." });
  } catch (err) {
    console.error("Restore error:", err);
    res.status(500).json({ message: "Server error during restore process." });
  }
});

router.delete('/delete/:type/:id', async (req, res) => {
  const { type, id } = req.params;

  const validTypes = ['categories', 'products', 'suppliers', 'customers', 'roles', 'users'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: "Invalid type provided." });
  }

  try {
    const [result] = await db.execute(
      `DELETE FROM ${type} WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data not found." });
    }

    res.json({ message: "Data permanently deleted." });
  } catch (err) {
    console.error("Permanent delete error:", err);
    res.status(500).json({ message: "Server error during delete process." });
  }
});




module.exports = router;
