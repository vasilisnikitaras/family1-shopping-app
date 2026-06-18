import "./loadEnv.js";
import express from "express";
import cors from "cors";
import { sql } from "./api/db.js";

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// GET ITEMS
// ----------------------------------------------------
app.get("/api/getList", async (req, res) => {
  try {
    const rows = await sql`
      SELECT 
        id,
        name,
        quantity,
        store_id,
        family_room,
        is_checked,
        created_at
      FROM items_v2
      WHERE family_room = 'vasilis_toni_billy_triantafilia_rose'
      ORDER BY created_at ASC;
    `;
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// ----------------------------------------------------
// ADD ITEM
// ----------------------------------------------------
app.post("/api/addListItem", async (req, res) => {
  try {
    const { name, quantity, store_id } = req.body;

    const family_room = "vasilis_toni_billy_triantafilia_rose";

    const rows = await sql`
      INSERT INTO items_v2 (name, quantity, store_id, family_room, is_checked)
      VALUES (${name}, ${quantity}, ${store_id}, ${family_room}, false)
      RETURNING *;
    `;

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// ----------------------------------------------------
// TOGGLE ITEM
// ----------------------------------------------------
app.post("/api/toggleListItem", async (req, res) => {
  try {
    const { id, checked } = req.body;

    await sql`
      UPDATE items_v2
      SET is_checked = ${checked}
      WHERE id = ${id};
    `;

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle item" });
  }
});

// ----------------------------------------------------
// DELETE ITEM
// ----------------------------------------------------
app.post("/api/deleteListItem", async (req, res) => {
  try {
    const { id } = req.body;

    await sql`
      DELETE FROM items_v2
      WHERE id = ${id};
    `;

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// ----------------------------------------------------
// GET STORES
// ----------------------------------------------------
app.get("/api/getStores", async (req, res) => {
  try {
    const rows = await sql`
      SELECT 
        id,
        store_name,
        created_at
      FROM stores_v2
      ORDER BY store_name ASC;
    `;
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stores" });
  }
});

// ----------------------------------------------------
// ADD STORE
// ----------------------------------------------------
app.post("/api/addStore", async (req, res) => {
  try {
    const { name } = req.body;

    const rows = await sql`
      INSERT INTO stores_v2 (store_name)
      VALUES (${name})
      RETURNING *;
    `;

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add store" });
  }
});

// ----------------------------------------------------
// DELETE STORE
// ----------------------------------------------------
app.post("/api/deleteStore", async (req, res) => {
  try {
    const { id } = req.body;

    await sql`
      UPDATE items_v2
      SET store_id = NULL
      WHERE store_id = ${id};
    `;

    await sql`
      DELETE FROM stores_v2
      WHERE id = ${id};
    `;

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete store" });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:3000");
});
