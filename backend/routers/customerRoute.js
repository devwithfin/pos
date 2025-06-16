const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/customers', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM customers WHERE deleted_at IS NULL ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/customer', async (req, res) => {
  try {
    const {name, contact } = req.body;
    if (!name && !contact) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    const sql = 'INSERT INTO customers (name, contact) VALUES (?, ?)';
    await db.execute(sql, [name, contact]);
    res.status(201).json({ message: 'Customer Successfully Saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put("/customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact } = req.body;
    console.log("Updating customer:", { id, name, contact });

    if (!id || !name || !contact) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    const [result] = await db.execute(
      "UPDATE customers SET name = ?, contact = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
      [name, contact, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer Not Found or Already Deleted" });
    }

    res.json({ message: "Customer Successfully Updated" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete('/customer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Soft Deleting ID:', id);

    if (!id) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const [result] = await db.execute(
      'UPDATE customers SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL',
      [id]
    );
    console.log('Soft delete result:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer Not Found or Already Deleted' });
    }

    res.json({ message: 'Customer Soft Deleted Successfully' });
  } catch (error) {
    console.error('Soft Delete Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;