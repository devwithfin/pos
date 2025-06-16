const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.execute(`
 SELECT users.id, users.username, users.role_id, roles.name, users.created_at, users.updated_at
FROM users
INNER JOIN roles ON roles.id = users.role_id ORDER BY created_at DESC;

`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
