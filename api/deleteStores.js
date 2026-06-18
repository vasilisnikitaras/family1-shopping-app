import { sql } from "./db.js";

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "Store ID is required" }, { status: 400 });
    }

    // 1️⃣ Αφαιρούμε το store από όλα τα items
    await sql`
      UPDATE items_v2
      SET store_id = NULL
      WHERE store_id = ${id};
    `;

    // 2️⃣ Διαγράφουμε το store
    await sql`
      DELETE FROM stores_v2
      WHERE id = ${id};
    `;

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting store:", error);
    return Response.json({ error: "Failed to delete store" }, { status: 500 });
  }
}
