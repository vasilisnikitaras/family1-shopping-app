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
      SELECT id, name, family_id
      FROM stores
      WHERE family_id = ${family_id}
      ORDER BY name ASC;
    `;

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching stores:", error);
    return res.status(500).json({ error: "Failed to fetch stores" });
  }
}
