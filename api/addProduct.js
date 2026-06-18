import { sql } from "./db.js";

export default async function handler(req) {
  try {
    if (req.method !== "POST") {
      return Response.json({ error: "Method not allowed" }, { status: 405 });
    }

    const { name, store_id } = await req.json();

    if (!name || !store_id) {
      return Response.json(
        { error: "Name and store_id are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO products (name, store_id)
      VALUES (${name}, ${store_id})
      RETURNING *;
    `;

    return Response.json(result[0], { status: 200 });
  } catch (error) {
    console.error("Error adding product:", error);
    return Response.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
