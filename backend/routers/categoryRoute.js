const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/categories", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM categories WHERE deleted_at IS NULL ORDER BY id DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/category", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const sql = "INSERT INTO categories (name) VALUES (?)";
    await db.execute(sql, [name]);
    res.status(201).json({ message: "Category Successfully Saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log("Updating category:", { id, name });

    if (!id || !name) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    const [result] = await db.execute(
      "UPDATE categories SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
      [name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Category Not Found or Already Deleted" });
    }

    res.json({ message: "Category Successfully Updated" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Soft Deleting ID:", id);

    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const [result] = await db.execute(
      "UPDATE categories SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL",
      [id]
    );
    console.log("Soft delete result:", result);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Category Npt Found or Already Deleted" });
    }

    res.json({ message: "Category Soft Deleted Successfully" });
  } catch (error) {
    console.error("Soft delete error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
