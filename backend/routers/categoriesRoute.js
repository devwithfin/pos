const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM categories ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const {name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    const sql = 'INSERT INTO categories (name) VALUES (?)';
    await db.execute(sql, [name]);
    res.status(201).json({ message: 'Category Successfully Saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;