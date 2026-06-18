import { sql } from "./db.js";

export default async function handler(req, res) {
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY id ASC;
    `;
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}
