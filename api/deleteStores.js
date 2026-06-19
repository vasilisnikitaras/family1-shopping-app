import { sql } from "./db.js";

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { id, family_id } = await req.json();

    if (!id || !family_id) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1️⃣ Αφαιρούμε το store από items ΜΟΝΟ αν ανήκει στην ίδια οικογένεια
    await sql`
      UPDATE items_v2
      SET store_id = NULL
      WHERE store_id = ${id} AND family_id = ${family_id};
    `;

    // 2️⃣ Διαγράφουμε το store ΜΟΝΟ αν ανήκει στην ίδια οικογένεια
    const result = await sql`
      DELETE FROM stores_v2
      WHERE id = ${id} AND family_id = ${family_id}
      RETURNING id;
    `;

    if (result.length === 0) {
      return Response.json(
        { error: "Store not found or not allowed" },
        { status: 404 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting store:", error);
    return Response.json({ error: "Failed to delete store" }, { status: 500 });
  }
}
