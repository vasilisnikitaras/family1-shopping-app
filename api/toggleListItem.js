import { sql } from "./db.js";

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { id, checked } = await req.json();

    if (!id) {
      return Response.json({ error: "Item ID is required" }, { status: 400 });
    }

    await sql`
      UPDATE items_v2
      SET is_checked = ${checked}
      WHERE id = ${id};
    `;

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error toggling list item:", error);
    return Response.json({ error: "Failed to toggle list item" }, { status: 500 });
  }
}
