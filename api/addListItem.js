import { sql } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, quantity, store_id, family_id } = JSON.parse(req.body);

    if (!name || !quantity || !store_id || !family_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sql`
      INSERT INTO items_v2 (name, quantity, store_id, family_id, is_checked)
      VALUES (${name}, ${quantity}, ${store_id}, ${family_id}, false)
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding item:", error);
    return res.status(500).json({ error: "Failed to add item" });
  }
}
