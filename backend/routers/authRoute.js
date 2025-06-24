const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; 
    next();
  });
}


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password Required" });
    }

    const [rows] = await db.execute(
      `SELECT u.id, u.username, u.password_hash, r.name AS role_name, u.created_at, u.updated_at
       FROM users AS u
       INNER JOIN roles AS r ON r.id = u.role_id
       WHERE u.username = ?`,
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const user = rows[0];

    if (!user.password_hash) {
      return res.status(500).json({ message: "User Password Not Found" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      id: user.id,
      username: user.username,
      role_name: user.role_name,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});


router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout Success" });
});


router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT u.username, r.name AS role_name, u.updated_at
       FROM users AS u
       JOIN roles AS r ON u.role_id = r.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
