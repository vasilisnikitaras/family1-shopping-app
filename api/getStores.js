import { sql } from "./db.js";

export default async function handler(req) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { family_id } = await req.json();

    const rows = await sql`
      SELECT id, name, family_id
      FROM stores
      WHERE family_id = ${family_id}
      ORDER BY name ASC;
    `;

    return Response.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return Response.json({ error: "Failed to fetch stores" }, { status: 500 });
  }
}
