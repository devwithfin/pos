const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/customers', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM customers ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/customers', async (req, res) => {
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


module.exports = router;