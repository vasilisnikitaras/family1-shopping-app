import { sql } from "./db.js";

export default async function handler(req) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { family_id } = await req.json();

    const rows = await sql`
      SELECT id, name, quantity, store_id, family_id, is_checked, created_at
      FROM items_v2
      WHERE family_id = ${family_id}
      ORDER BY created_at DESC;
    `;

    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return Response.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
