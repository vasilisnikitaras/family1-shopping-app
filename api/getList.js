import { sql } from "./db.js";

export default async function handler(req) {
  try {
    const rows = await sql`
      SELECT id, family_room, quantity, store_id, is_checked, created_at, name
      FROM items_v2
      WHERE family_room = 'vasilis_toni_billy_triantafilia_rose'
      ORDER BY created_at ASC;
    `;

    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return Response.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
