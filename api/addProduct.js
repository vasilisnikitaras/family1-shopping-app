import { sql } from "./db.js";

export default async function handler(req, res) {
  try {
    const { name, store_id } = await req.json();

    if (!name || !store_id) {
      return res.status(400).json({ error: "Name and store_id are required" });
    }

    const result = await sql`
      INSERT INTO products (name, store_id)
      VALUES (${name}, ${store_id})
      RETURNING *;
    `;

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ error: "Failed to add product" });
  }
}
