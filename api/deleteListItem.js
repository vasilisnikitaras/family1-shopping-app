import { sql } from "./db.js";

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "Item ID is required" }, { status: 400 });
    }

    await sql`
      DELETE FROM items_v2
      WHERE id = ${id};
    `;

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return Response.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
