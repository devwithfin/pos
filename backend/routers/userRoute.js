const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require('bcrypt');


router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.execute(`
 SELECT 
  users.id, 
  users.username, 
  users.role_id, 
  roles.name AS role_name, 
  users.created_at, 
  users.updated_at
FROM users
INNER JOIN roles ON roles.id = users.role_id
WHERE users.deleted_at IS NULL
ORDER BY users.created_at DESC
`);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



router.post("/user", async (req, res) => {
  try {
    const { username, password, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows] = await db.execute(
      `INSERT INTO users (username, password_hash, role_id) VALUES (?, ?, ?)`,
      [username, hashedPassword, role_id]
    );

    res.status(201).json({ message: "User Created Successfully", userId: rows.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Soft Deleting ID:", id);

    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const [result] = await db.execute(
      "UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
      [id]
    );
    console.log("Soft delete result:", result);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "User Npt Found or Already Deleted" });
    }

    res.json({ message: "User Soft Deleted Successfully" });
  } catch (error) {
    console.error("Soft delete error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userId = req.body.user_id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [rows] = await db.execute(
      "SELECT password_hash FROM users WHERE id = ? AND deleted_at IS NULL",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.execute(
      "UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [hashedPassword, userId]
    );

    res.json({ message: "Password changed successfully. Please Re-Login" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
