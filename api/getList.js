import { sql } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { family_id } = JSON.parse(req.body);

    if (!family_id) {
      return res.status(400).json({ error: "family_id is required" });
    }

    const rows = await sql`
      SELECT id, name, quantity, store_id, family_id, is_checked, created_at
      FROM items_v2
      WHERE family_id = ${family_id}
      ORDER BY created_at DESC;
    `;

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "Failed to fetch items" });
  }
}
