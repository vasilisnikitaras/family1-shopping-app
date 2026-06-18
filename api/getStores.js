import { sql } from "./db.js";

export default async function handler(req) {
  try {
    const rows = await sql`
      SELECT id, store_name, created_at
      FROM stores_v2
      ORDER BY store_name ASC;
    `;

    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return Response.json({ error: "Failed to fetch stores" }, { status: 500 });
  }
}
