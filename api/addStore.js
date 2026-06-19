import { sql } from "./db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, family_id } = JSON.parse(req.body);

    if (!name || !family_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sql`
      INSERT INTO stores (name, family_id)
      VALUES (${name}, ${family_id})
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding store:", error);
    return res.status(500).json({ error: "Failed to add store" });
  }
}
