import { sql } from "./db.js";

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { name, quantity, store_id, family_room } = await req.json();

    const rows = await sql`
      INSERT INTO items_v2 (name, quantity, store_id, family_room, is_checked)
      VALUES (${name}, ${quantity}, ${store_id}, ${family_room}, false)
      RETURNING id, family_room, quantity, store_id, is_checked, created_at, name;
    `;

    return Response.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error adding item:", error);
    return Response.json({ error: "Failed to add item" }, { status: 500 });
  }
}
