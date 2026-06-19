import { sql } from "./db.js";

export default async function handler(req) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { name, family_id } = await req.json();

    await sql`
      INSERT INTO stores (name, family_id)
      VALUES (${name}, ${family_id})
    `;

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding store:", error);
    return Response.json({ error: "Failed to add store" }, { status: 500 });
  }
}
