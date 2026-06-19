import { sql } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id, checked, family_id } = JSON.parse(req.body);

    if (!id || family_id === undefined || checked === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await sql`
      UPDATE items_v2
      SET is_checked = ${checked}
      WHERE id = ${id} AND family_id = ${family_id}
      RETURNING id;
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: "Item not found or not allowed" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error toggling item:", error);
    return res.status(500).json({ error: "Failed to toggle item" });
  }
}
