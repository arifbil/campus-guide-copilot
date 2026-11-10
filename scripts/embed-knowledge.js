require("dotenv").config({ path: ".env.local" });

const { GoogleGenAI } = require("@google/genai");
const { Pool } = require("pg");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
});

async function main() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT id, content FROM knowledge_chunks ORDER BY id",
    );

    console.log("Jumlah chunks:", result.rows.length);

    for (const row of result.rows) {
      const embeddingResult = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: row.content,
      });

      const embedding = embeddingResult.embeddings[0].values;

      await client.query(
        `
        UPDATE knowledge_chunks
        SET embedding = $1
        WHERE id = $2
        `,
        [JSON.stringify(embedding), row.id],
      );

      console.log(`Embedding chunk ${row.id}/${result.rows.length} berhasil`);
    }

    console.log("Semua embedding berhasil disimpan.");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Gagal membuat embedding:", error);
  process.exit(1);
});
