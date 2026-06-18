import { sql } from "./db.js";

export default async function handler(req) {
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY id ASC;
    `;

    return Response.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
