import { sql } from "./db.js";

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { name } = await req.json();

    const rows = await sql`
      INSERT INTO stores_v2 (store_name)
      VALUES (${name})
      RETURNING id, store_name, created_at;
    `;

    return Response.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Error adding store:", error);
    return Response.json({ error: "Failed to add store" }, { status: 500 });
  }
}
